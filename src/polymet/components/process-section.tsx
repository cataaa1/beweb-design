import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/polymet/data/beweb-data";
import { SplitLines, useInView } from "@/polymet/components/reveal";

const NODES = [
  { x: 6, y: 18, label: "discovery.md", meta: "brief · kpis" },
  { x: 58, y: 14, label: "figma / prototipo", meta: "v12 · aprobado" },
  { x: 14, y: 60, label: "next-app", meta: "main · 214 commits" },
  { x: 60, y: 66, label: "producción", meta: "beweb.dev · live" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

export function ProcessSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.3, false);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % processSteps.length), 2800);
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <section id="proceso" className="relative bg-marino-deep py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-crema md:text-7xl">
          <SplitLines lines={["Del brief al deploy,", "sin cajas negras."]} />
        </h2>

        <div
          ref={ref}
          className="mt-20 grid grid-cols-12 gap-x-10 gap-y-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol className="col-span-12 lg:col-span-5">
            {processSteps.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.index}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative block w-full border-t border-bruma/15 py-6 text-left"
                  >
                    <span
                      className="absolute left-0 top-[-1px] h-px bg-ladrillo transition-[width] ease-linear"
                      style={{
                        width: on ? "100%" : "0%",
                        transitionDuration: on && !paused ? "2800ms" : "300ms",
                      }}
                    />
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex items-baseline gap-5">
                        <span className={cn("font-mono text-xs", on ? "text-ladrillo" : "text-crema/40")}>
                          {s.index}
                        </span>
                        <span
                          className={cn(
                            "text-2xl font-medium tracking-[-0.03em] transition-colors md:text-3xl",
                            on ? "text-crema" : "text-crema/40"
                          )}
                        >
                          {s.title}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] text-bruma/60">{s.duration}</span>
                    </div>
                    <p
                      className={cn(
                        "overflow-hidden pl-10 text-sm leading-relaxed text-crema/60 transition-all duration-500",
                        on ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {s.body}
                    </p>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-bruma/15 bg-marino bw-dots-bg md:aspect-[16/11]">
              <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-bruma/10 bg-marino/80 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-crema/50 backdrop-blur">
                <span>proyecto / cliente-2025</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-bruma bw-blink" />
                  etapa {processSteps[active].index}
                </span>
              </div>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {EDGES.map(([a, b]) => {
                  const A = NODES[a];
                  const B = NODES[b];
                  const lit = active >= b;
                  return (
                    <path
                      key={`${a}-${b}`}
                      d={`M ${A.x + 17} ${A.y + 12} C ${A.x + 17} ${(A.y + B.y) / 2 + 14}, ${B.x + 17} ${(A.y + B.y) / 2 - 4}, ${B.x + 17} ${B.y + 2}`}
                      fill="none"
                      stroke={lit ? "#B5473A" : "#9CC2E0"}
                      strokeOpacity={lit ? 0.9 : 0.25}
                      vectorEffect="non-scaling-stroke"
                      className="bw-dash transition-[stroke] duration-500"
                      style={{ strokeWidth: 1.5 }}
                    />
                  );
                })}
              </svg>

              {NODES.map((n, i) => {
                const on = active === i;
                const done = active > i;
                return (
                  <button
                    type="button"
                    key={n.label}
                    onClick={() => setActive(i)}
                    className={cn(
                      "absolute w-[34%] min-w-[150px] border bg-marino-2 p-3 text-left transition-all duration-500 md:p-4",
                      on
                        ? "z-10 -translate-y-1 border-ladrillo shadow-[0_30px_60px_-20px_rgba(181,71,58,0.45)]"
                        : "border-bruma/15 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)]"
                    )}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 truncate text-sm font-medium text-crema">
                        <span className={cn("h-2 w-2 shrink-0", on ? "bg-ladrillo" : done ? "bg-bruma" : "bg-crema/20")} />
                        {n.label}
                      </span>
                      <span className="font-mono text-[9px] text-crema/40">0{i + 1}</span>
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-crema/50">{n.meta}</div>
                    <div className="mt-3 h-1 w-full bg-bruma/10">
                      <div
                        className="h-full bg-bruma transition-[width] duration-700"
                        style={{ width: done ? "100%" : on ? "60%" : "0%" }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
