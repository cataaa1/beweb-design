// Animated pixel noise field on every canvas[data-pixel-field] (hero and footer).
// The mouse heats the field up (see heat.ts), which shows as concentric colour rings.
//
// Rendering is kept cheap on purpose (it runs every frame): each cell is one pixel of a small
// ImageData, blown up with a single drawImage, and the gaps between cells are cut out with a
// precomputed mask. Drawing cells one by one with fillRect blocked the main thread for seconds.

import { HeatGrid, pointer } from "./heat";

const PALETTE = ["#1F2F45", "#3E5C7E", "#9CC2E0", "#EDE6D8", "#B5473A"].map((hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
]);
const GAP = 1.5;
/** Frame interval while nobody interacts; the drift is slow enough that 30fps looks the same */
const IDLE_FRAME_MS = 33;

// Value noise on a random lattice (a table lookup is far cheaper than a sin-based hash)
const LATTICE = new Float32Array(256 * 256).map(() => Math.random());

function hash(x: number, y: number) {
  return LATTICE[((x & 255) << 8) | (y & 255)];
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function initPixelField(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  const cells = document.createElement("canvas");
  const cellsCtx = cells.getContext("2d");
  const gaps = document.createElement("canvas");
  const gapsCtx = gaps.getContext("2d");
  if (!ctx || !cellsCtx || !gapsCtx) return;

  const cell = Number(canvas.dataset.cell ?? 11);
  const speed = Number(canvas.dataset.speed ?? 1);
  const fade = canvas.dataset.fade !== "false";
  const heat = new HeatGrid(cell);

  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let jitter = new Float32Array(0);
  let image = new ImageData(1, 1);
  let visible = true;
  let last = 0;
  let drawn = 0;
  let dpr = 1;
  // Viewport position, only needed to place the mouse heat; re-read lazily after a scroll or resize
  let origin = { left: 0, top: 0 };
  let originStale = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = (width: number, height: number) => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = width;
    h = height;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    cols = Math.ceil(w / cell);
    rows = Math.ceil(h / cell);
    cells.width = cols;
    cells.height = rows;
    image = new ImageData(cols, rows);
    jitter = new Float32Array(cols * rows);
    for (let i = 0; i < jitter.length; i++) jitter[i] = (Math.random() - 0.5) * 0.09;
    heat.resize(w, h);
    originStale = true;

    // Gap mask: a thin line along the right and bottom edge of every cell
    gaps.width = canvas.width;
    gaps.height = canvas.height;
    gapsCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gapsCtx.fillStyle = "#000";
    for (let x = 1; x <= cols; x++) gapsCtx.fillRect(x * cell - GAP, 0, GAP, h + cell);
    for (let y = 1; y <= rows; y++) gapsCtx.fillRect(0, y * cell - GAP, w + cell, GAP);
  };

  const draw = (time: number) => {
    requestAnimationFrame(draw);
    const dt = last ? Math.min(time - last, 100) : 16.667;
    last = time;
    if (!visible || !cols) return;

    const interacting = pointer.active || heat.max > 0;
    if (!interacting && drawn && time - drawn < IDLE_FRAME_MS) return;
    const step = drawn ? Math.min(time - drawn, 100) : dt;
    drawn = time;

    if (pointer.active && originStale) {
      const r = canvas.getBoundingClientRect();
      origin = { left: r.left, top: r.top };
      originStale = false;
    }
    heat.update(step, origin.left, origin.top);

    const t = reduce ? 0 : (time / 1000) * 0.12 * speed;
    const data = image.data;
    for (let y = 0; y < rows; y++) {
      const ny = y / rows;
      const edge = fade ? Math.min(1, Math.min(ny, 1 - ny) * 3.2) : 1;
      const gain = 0.35 + edge * 0.75;
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        let n =
          noise(x * 0.045 + t, y * 0.09 - t * 0.4) * 0.65 + noise(x * 0.12 - t * 1.4, y * 0.2 + t * 0.6) * 0.35;
        n = n * gain + jitter[i] + heat.at(x, y) * 0.7;
        let idx = -1;
        if (n > 0.93) idx = 4;
        else if (n > 0.8) idx = 3;
        else if (n > 0.66) idx = 2;
        else if (n > 0.52) idx = 1;
        else if (n > 0.43) idx = 0;
        const o = i * 4;
        if (idx < 0) {
          data[o + 3] = 0;
          continue;
        }
        const c = PALETTE[idx];
        data[o] = c[0];
        data[o + 1] = c[1];
        data[o + 2] = c[2];
        data[o + 3] = 255;
      }
    }
    cellsCtx.putImageData(image, 0, 0);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (heat.shake > 0) {
      ctx.translate((Math.random() - 0.5) * heat.shake * 8 * dpr, (Math.random() - 0.5) * heat.shake * 8 * dpr);
    }
    ctx.imageSmoothingEnabled = false;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(cells, 0, 0, cols * cell * dpr, rows * cell * dpr);
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(gaps, 0, 0);
    ctx.globalCompositeOperation = "source-over";
  };

  // The observer reports the size without forcing a layout, and fires once on observe
  new ResizeObserver(([entry]) => {
    const box = entry.contentRect;
    resize(box.width, box.height);
    drawn = 0;
  }).observe(canvas);
  requestAnimationFrame(draw);

  window.addEventListener("scroll", () => (originStale = true), { passive: true });
  window.addEventListener("resize", () => (originStale = true), { passive: true });

  // Click to explode: hold to charge, release to fire (see HeatGrid.press/release)
  const local = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };
  canvas.addEventListener("pointerdown", (e) => {
    canvas.setPointerCapture(e.pointerId);
    heat.press(...local(e));
  });
  canvas.addEventListener("pointermove", (e) => heat.drag(...local(e)));
  canvas.addEventListener("pointerup", () => heat.release());
  canvas.addEventListener("pointercancel", () => heat.cancel());
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
}

document.querySelectorAll<HTMLCanvasElement>("canvas[data-pixel-field]").forEach(initPixelField);
