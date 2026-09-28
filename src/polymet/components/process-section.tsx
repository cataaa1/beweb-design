import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/polymet/data/beweb-data";
import { SplitLines, useInView } from "@/polymet/components/reveal";

const POS = [
  { x: 2, y: 20 },
  { x: 26.5, y: 50 },
  { x: 51, y: 20 },
  { x: 75.5, y: 50 },
];
const W = 22.5;
const H = 34;
const INTERVAL = 2800;

function StepCard({
  step,
  on,
  done,
  paused,
  onSelect,
  className,
  style,
}: {
  step: (typeof processSteps)[number];
  on: boolean;
  done: boolean;
  paused: boolean;
  onSelect: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={style}
      className={cn(
        "flex flex-col border bg-marino-2 p-5 text-left transition-all duration-500",
        on
          ? "z-10 -translate-y-1 border-ladrillo shadow-[0_30px_60px_-20px_rgba(181,71,58,0.45)]"
          : "border-bruma/15 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <span
        className={cn(
          "text-5xl font-semibold leading-none tracking-[-0.05em] transition-colors duration-500 lg:text-6xl",
          on ? "text-ladrillo" : done ? "text-crema/25" : "text-crema/10"
        )}
      >
        {step.index}
      </span>
      <span className="mt-5 text-lg font-medium tracking-[-0.02em] text-crema">{step.title}</span>
      <span className="mt-2 text-sm leading-relaxed text-crema/60">{step.body}</span>
      <span className="mt-auto pt-5">
        <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-bruma/60">
          <span className="flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5", on ? "bg-ladrillo" : done ? "bg-bruma" : "bg-crema/20")} />
            {on ? "en curso" : done ? "listo" : "pendiente"}
          </span>
          {step.duration}
        </span>
        <span className="mt-3 block h-px w-full bg-bruma/10">
          <span
            className="block h-full bg-bruma transition-[width] ease-linear"
            style={{
              width: done ? "100%" : on ? "100%" : "0%",
              transitionDuration: on && !paused ? `${INTERVAL}ms` : "400ms",
            }}
          />
        </span>
      </span>
    </button>
  );
}

export function ProcessSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.3, false);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % processSteps.length), INTERVAL);
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <section id="proceso" className="relative bg-marino-deep py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-crema md:text-7xl">
          <SplitLines lines={["Cómo trabajamos:", "claro y colaborativo."]} />
        </h2>

        <div
          ref={ref}
          className="relative mt-20 w-full overflow-hidden border border-bruma/15 bg-marino bw-dots-bg"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative z-20 flex items-center justify-between border-b border-bruma/10 bg-marino/80 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-crema/50 backdrop-blur">
            <span>tu proyecto</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-bruma bw-blink" />
              etapa {processSteps[active].index}
            </span>
          </div>

          {/* Mobile: stacked */}
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:hidden">
            {processSteps.map((s, i) => (
              <StepCard
                key={s.index}
                step={s}
                on={active === i}
                done={active > i}
                paused={paused}
                onSelect={() => setActive(i)}
              />
            ))}
          </div>

          {/* Desktop: diagram */}
          <div className="relative hidden aspect-[16/8] lg:block">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {POS.slice(0, -1).map((A, i) => {
                const B = POS[i + 1];
                const lit = active > i;
                const x1 = A.x + W;
                const y1 = A.y + H / 2;
                const x2 = B.x;
                const y2 = B.y + H / 2;
                const mx = (x1 + x2) / 2;
                return (
                  <path
                    key={i}
                    d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={lit ? "#B5473A" : "#9CC2E0"}
                    strokeOpacity={lit ? 0.9 : 0.3}
                    vectorEffect="non-scaling-stroke"
                    className="bw-dash transition-[stroke] duration-500"
                    style={{ strokeWidth: 1.5 }}
                  />
                );
              })}
            </svg>

            {processSteps.map((s, i) => (
              <StepCard
                key={s.index}
                step={s}
                on={active === i}
                done={active > i}
                paused={paused}
                onSelect={() => setActive(i)}
                className="absolute"
                style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%`, width: `${W}%`, minHeight: `${H}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
