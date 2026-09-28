// Animated pixel noise field on every canvas[data-pixel-field] (hero and footer).
// The mouse heats the field up (see heat.ts), which shows as concentric colour rings.

import { HeatGrid } from "./heat";

const PALETTE = ["#1F2F45", "#3E5C7E", "#9CC2E0", "#EDE6D8", "#B5473A"];

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  const u = smooth(xf);
  const v = smooth(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function initPixelField(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cell = Number(canvas.dataset.cell ?? 11);
  const speed = Number(canvas.dataset.speed ?? 1);
  const fade = canvas.dataset.fade !== "false";
  const heat = new HeatGrid(cell);

  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let jitter: Float32Array = new Float32Array(0);
  let visible = true;
  let last = 0;
  let dpr = 1;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / cell);
    rows = Math.ceil(h / cell);
    jitter = new Float32Array(cols * rows);
    for (let i = 0; i < jitter.length; i++) jitter[i] = (Math.random() - 0.5) * 0.09;
    heat.resize(w, h);
  };

  const draw = (time: number) => {
    requestAnimationFrame(draw);
    const dt = last ? Math.min(time - last, 100) : 16.667;
    last = time;
    if (!visible) return;
    const rect = canvas.getBoundingClientRect();
    heat.update(dt, rect.left, rect.top);
    const t = reduce ? 0 : (time / 1000) * 0.12 * speed;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (heat.shake > 0) ctx.translate((Math.random() - 0.5) * heat.shake * 8, (Math.random() - 0.5) * heat.shake * 8);
    const gap = 1.5;
    for (let y = 0; y < rows; y++) {
      const ny = y / rows;
      const edge = fade ? Math.min(1, Math.min(ny, 1 - ny) * 3.2) : 1;
      for (let x = 0; x < cols; x++) {
        let n =
          noise(x * 0.045 + t, y * 0.09 - t * 0.4) * 0.65 +
          noise(x * 0.12 - t * 1.4, y * 0.2 + t * 0.6) * 0.35;
        n = n * (0.35 + edge * 0.75) + jitter[y * cols + x] + heat.at(x, y) * 0.7;
        let idx = -1;
        if (n > 0.93) idx = 4;
        else if (n > 0.8) idx = 3;
        else if (n > 0.66) idx = 2;
        else if (n > 0.52) idx = 1;
        else if (n > 0.43) idx = 0;
        if (idx < 0) continue;
        ctx.fillStyle = PALETTE[idx];
        ctx.fillRect(x * cell, y * cell, cell - gap, cell - gap);
      }
    }
  };

  resize();
  requestAnimationFrame(draw);

  new ResizeObserver(resize).observe(canvas);

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
