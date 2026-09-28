import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

/** Simple trailing ball cursor — Ladrillo dot that grows into a Bruma ring over interactive elements */
export function CursorBall() {
  const ballRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ball = ballRef.current;
    if (!ball) return;
    const root = document.documentElement;
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
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ballRef}
      aria-hidden="true"
      data-visible="false"
      className="bw-cursor pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <span className="bw-cursor-dot" />
    </div>
  );
}
