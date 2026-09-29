// Pixel "heat" that follows the mouse (modelled on craft.wild.as): every frame the cursor stamps a
// gaussian of heat along its path, and the heat fades fast, leaving a short pixel trail. Each
// canvas keeps its own grid; this module shares the pointer state and the stamping/decay rules.

export const pointer = { x: 0, y: 0, active: false, lastMove: 0, overInteractive: false };

// Over links, buttons, fields and [data-no-trail] areas the trail backs off, so what is being pointed
// at stays readable
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button'], [data-no-trail]";

const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
export const heatEnabled = () => fine.matches && !reduce.matches;

window.addEventListener(
  "pointermove",
  (e) => {
    if (e.pointerType !== "mouse") return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
    pointer.lastMove = performance.now();
    pointer.overInteractive = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
  },
  { passive: true },
);
document.documentElement.addEventListener("pointerleave", () => (pointer.active = false));
window.addEventListener("blur", () => (pointer.active = false));

const SIGMA = 16; // brush radius (px)
const REACH = SIGMA * 2.8; // beyond this the gaussian is < 0.02
const STEP = 7; // px between stamps along the path, so fast flicks stay continuous
const AMOUNT = 0.16; // heat per stamp
const DECAY = 0.878; // per 60fps frame
const IDLE_MS = 1200; // stop feeding the blob when the mouse rests, so it fades away

// Click explosions (also from wild.as): holding charges a glow, releasing fires a shockwave ring
const BLAST = 38; // base radius (px) of the charge glow and the release flash
const CHARGE_S = 2.2; // hold this long for a full-power blast
const WAVE_S = 1.5; // shockwave lifetime

interface Wave {
  x: number;
  y: number;
  t: number;
  pow: number;
}

export class HeatGrid {
  cols = 0;
  rows = 0;
  heat = new Float32Array(0);
  max = 0;
  /** Screen shake strength, decays every frame; the canvas jitters by about shake × 8px */
  shake = 0;
  private waves: Wave[] = [];
  private charging: { x: number; y: number; t: number } | null = null;
  private px = NaN;
  private py = NaN;

  constructor(public cell: number) {}

  resize(width: number, height: number) {
    this.cols = Math.ceil(width / this.cell) + 1;
    this.rows = Math.ceil(height / this.cell) + 1;
    this.heat = new Float32Array(this.cols * this.rows);
    this.px = NaN;
  }

  private stamp(x: number, y: number, amount = AMOUNT, sigma = SIGMA) {
    const { cell, cols, rows, heat } = this;
    const reach = sigma * 2.8;
    const c0 = Math.max(0, Math.floor((x - reach) / cell));
    const c1 = Math.min(cols - 1, Math.floor((x + reach) / cell));
    const r0 = Math.max(0, Math.floor((y - reach) / cell));
    const r1 = Math.min(rows - 1, Math.floor((y + reach) / cell));
    const inv = 1 / (2 * sigma * sigma);
    for (let r = r0; r <= r1; r++) {
      const dy = (r + 0.5) * cell - y;
      for (let c = c0; c <= c1; c++) {
        const dx = (c + 0.5) * cell - x;
        const w = Math.exp(-(dx * dx + dy * dy) * inv);
        if (w < 0.02) continue;
        const id = r * cols + c;
        heat[id] = Math.min(1, heat[id] + amount * w);
      }
    }
  }

  /** Pointer pressed at (x, y), in grid-local px: start charging */
  press(x: number, y: number) {
    if (reduce.matches) return;
    this.charging = { x, y, t: performance.now() };
  }

  /** Pointer moved while pressed */
  drag(x: number, y: number) {
    if (this.charging) Object.assign(this.charging, { x, y });
  }

  /** Press abandoned (e.g. a touch that turned into a scroll): no blast */
  cancel() {
    this.charging = null;
  }

  /** Pointer released: the longer the hold, the bigger the blast */
  release() {
    const c = this.charging;
    if (!c) return;
    this.charging = null;
    const ch = Math.min((performance.now() - c.t) / 1000 / CHARGE_S, 1);
    this.stamp(c.x, c.y, 1, BLAST * (0.8 + ch * 2.5));
    this.waves.push({ x: c.x, y: c.y, t: performance.now(), pow: 0.35 + ch * 2.1 });
    this.shake = Math.max(this.shake, 0.45 + ch * 1.9);
  }

  /**
   * Advances one frame. `originX/Y` is the grid's top-left corner in viewport coordinates.
   * Returns false once the grid is cold and there is nothing to draw.
   */
  update(dt: number, originX: number, originY: number) {
    const k = Math.pow(DECAY, dt / 16.667);
    let max = 0;
    const heat = this.heat;
    for (let i = 0; i < heat.length; i++) {
      let v = heat[i];
      if (v === 0) continue;
      v *= k;
      if (v < 0.003) v = 0;
      heat[i] = v;
      if (v > max) max = v;
    }

    const feeding =
      pointer.active && !pointer.overInteractive && performance.now() - pointer.lastMove < IDLE_MS && heatEnabled();
    if (feeding) {
      const x = pointer.x - originX;
      const y = pointer.y - originY;
      const inReach = x > -REACH && y > -REACH && x < this.cols * this.cell + REACH && y < this.rows * this.cell + REACH;
      if (inReach) {
        if (Number.isNaN(this.px)) {
          this.px = x;
          this.py = y;
        }
        const dx = x - this.px;
        const dy = y - this.py;
        const steps = Math.max(1, Math.min(48, Math.round(Math.hypot(dx, dy) / STEP)));
        for (let s = 1; s <= steps; s++) this.stamp(this.px + (dx * s) / steps, this.py + (dy * s) / steps);
        max = 1;
      }
      this.px = x;
      this.py = y;
    } else {
      this.px = NaN;
    }

    // Charging: a growing glow under the pointer and a light rumble
    const now = performance.now();
    if (this.charging) {
      const ch = Math.min((now - this.charging.t) / 1000 / CHARGE_S, 1);
      this.stamp(this.charging.x, this.charging.y, (0.12 + ch * 0.18) * (dt / 16.667), BLAST * (0.6 + ch * 2.4));
      this.shake = Math.max(this.shake, 0.12 + ch * 0.35);
      max = 1;
    }

    // Shockwaves: a gaussian ring expanding from each blast, fading over WAVE_S
    if (this.waves.length) {
      const { cell, cols, rows } = this;
      const reach = Math.hypot(cols * cell, rows * cell) * 0.6; // ring speed, px/s
      this.waves = this.waves.filter((w) => (now - w.t) / 1000 < WAVE_S);
      for (const w of this.waves) {
        const age = (now - w.t) / 1000;
        const R = age * reach;
        const sig = cell * (1.8 + w.pow * 1.4); // ring thickness
        const amp = Math.max(0, 1 - age / WAVE_S) * (0.55 + w.pow * 0.35);
        const inv = 1 / (2 * sig * sig);
        for (let r = 0; r < rows; r++) {
          const dy = (r + 0.5) * cell - w.y;
          for (let c = 0; c < cols; c++) {
            const dx = (c + 0.5) * cell - w.x;
            const dd = Math.sqrt(dx * dx + dy * dy) - R;
            const g = amp * Math.exp(-dd * dd * inv);
            if (g < 0.02) continue;
            const id = r * cols + c;
            if (g > heat[id]) heat[id] = g;
          }
        }
      }
      max = 1;
    }
    this.shake = this.shake > 0.01 ? this.shake * Math.pow(0.9, dt / 16.667) : 0;

    this.max = max;
    return max > 0;
  }

  at(c: number, r: number) {
    return c < this.cols && r < this.rows ? this.heat[r * this.cols + c] : 0;
  }
}
