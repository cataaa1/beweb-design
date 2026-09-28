// Launches the pixel rocket (components/PixelRocket.astro): it rumbles, a pixel explosion bursts
// from the nozzle and it flies off the top of the screen leaving a pixel trail, then comes back.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const COLORS = ["#B5473A", "#EDE6D8", "#9CC2E0", "#3E5C7E"];
const PX = 6; // one rocket pixel, in CSS px
let flying = false;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

/** One square particle that travels (dx, dy) while fading, moving in visible steps */
function particle(layer: HTMLElement, x: number, y: number, dx: number, dy: number, size: number, color: string, ms: number) {
  const p = document.createElement("div");
  p.style.cssText = `position:absolute;left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background:${color}`;
  layer.append(p);
  p.animate(
    [
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${Math.round(dx / PX) * PX}px,${Math.round(dy / PX) * PX}px)`, opacity: 0 },
    ],
    { duration: ms, easing: `steps(${Math.max(4, Math.round(ms / 90))})`, fill: "forwards" },
  ).finished.then(() => p.remove());
}

/** Ignition: sparks fan out downward and sideways, plus slower puffs of smoke */
function explode(layer: HTMLElement, x: number, y: number) {
  for (let i = 0; i < 30; i++) {
    const a = rand(-0.25, Math.PI + 0.25); // below the horizon, mostly
    const d = rand(40, 170);
    particle(layer, x, y, Math.cos(a) * d, Math.sin(a) * d * 0.8, pick([PX, PX, PX * 2]), pick(COLORS), rand(450, 900));
  }
  for (let i = 0; i < 10; i++) {
    const a = rand(0, Math.PI);
    particle(layer, x, y + PX * 2, Math.cos(a) * rand(50, 120), Math.sin(a) * rand(10, 40), PX * 3, "rgba(237,230,216,0.35)", rand(900, 1400));
  }
}

/**
 * Fires the launch. `fallback` is where the rocket appears from when the idle rocket is off-screen
 * (e.g. on mobile, where it sits above the form).
 */
export async function launchRocket(fallback: HTMLElement) {
  const rocket = document.querySelector<HTMLElement>("[data-rocket]");
  if (!rocket || flying || reduce.matches) return;
  flying = true;

  let rect = rocket.getBoundingClientRect();
  const onScreen = rocket.offsetParent !== null && rect.bottom > 0 && rect.top < window.innerHeight;
  if (!onScreen) {
    const b = fallback.getBoundingClientRect();
    rect = new DOMRect(b.left + b.width / 2 - 48, b.top - 180, 96, 168);
  }

  const layer = document.createElement("div");
  layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden";
  document.body.append(layer);

  const ship = rocket.querySelector("svg")!.cloneNode(true) as SVGSVGElement;
  ship.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px`;
  ship.querySelector<SVGGElement>("[data-flame-idle]")!.style.display = "none";
  ship.querySelector<SVGGElement>("[data-flame-launch]")!.style.display = "";
  layer.append(ship);
  rocket.style.visibility = "hidden";

  // Rumble on the pad
  const jitter = Array.from({ length: 10 }, (_, i) => ({
    transform: i === 9 ? "translate(0,0)" : `translate(${pick([-PX / 2, 0, PX / 2])}px,${pick([-PX / 2, 0, PX / 2])}px)`,
  }));
  await ship.animate(jitter, { duration: 500, easing: "steps(10)" }).finished;

  // Ignition blast at the nozzle, then lift-off with a trail
  const nozzle = () => {
    const r = ship.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height * 0.66] as const;
  };
  explode(layer, ...nozzle());
  const flight = ship.animate([{ transform: "translateY(0)" }, { transform: `translateY(${-(rect.bottom + 240)}px)` }], {
    duration: 1500,
    easing: "cubic-bezier(0.55,0,0.85,0.35)",
    fill: "forwards",
  });
  const trail = window.setInterval(() => {
    const [x, y] = nozzle();
    particle(layer, x + rand(-PX, PX), y, rand(-12, 12), rand(30, 80), pick([PX, PX * 2]), pick(COLORS), rand(400, 700));
  }, 35);
  await flight.finished;
  window.clearInterval(trail);
  await wait(900);
  layer.remove();

  // Back on the pad, pixel-fading in
  await wait(1200);
  rocket.style.visibility = "";
  await rocket.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: "steps(6)" }).finished;
  flying = false;
}
