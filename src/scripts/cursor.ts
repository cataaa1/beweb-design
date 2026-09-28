// Custom cursor, enabled only for fine pointers with hover.

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

const ball = document.querySelector<HTMLElement>("[data-cursor]");

function start(ball: HTMLElement) {
  const root = document.documentElement;
  ball.hidden = false;
  root.classList.add("bw-cursor-none");

  const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pos = { ...target };
  let raf = 0;
  let shown = false;

  const onMove = (e: PointerEvent) => {
    target.x = e.clientX;
    target.y = e.clientY;
    if (!shown) {
      pos.x = target.x;
      pos.y = target.y;
      shown = true;
      ball.dataset.visible = "true";
    }
    const el = e.target as Element | null;
    ball.dataset.hover = el && el.closest(INTERACTIVE) ? "true" : "false";
  };
  const onLeave = () => {
    shown = false;
    ball.dataset.visible = "false";
  };
  const onDown = () => (ball.dataset.down = "true");
  const onUp = () => (ball.dataset.down = "false");

  const loop = () => {
    pos.x += (target.x - pos.x) * 0.2;
    pos.y += (target.y - pos.y) * 0.2;
    ball.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  window.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);

  return () => {
    cancelAnimationFrame(raf);
    root.classList.remove("bw-cursor-none");
    ball.hidden = true;
    ball.dataset.visible = "false";
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
  };
}

if (ball) {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  let stop: (() => void) | null = null;
  const update = () => {
    if (fine.matches && !stop) stop = start(ball);
    else if (!fine.matches && stop) {
      stop();
      stop = null;
    }
  };
  update();
  fine.addEventListener("change", update);
}
