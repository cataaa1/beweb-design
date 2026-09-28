import { useEffect, useState } from "react";
import { stats } from "@/polymet/data/beweb-data";
import { useInView } from "@/polymet/components/reveal";

function Counter({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <span className="tabular-nums">
      {n}
      <span className="text-ladrillo">{suffix}</span>
    </span>
  );
}

export function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="bg-marino-deep pb-28 md:pb-40">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1440px] grid-cols-2 border-t border-bruma/15 px-5 md:grid-cols-4 md:px-10"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="border-bruma/15 py-10 pr-6 md:border-l md:pl-8 md:first:border-l-0 md:first:pl-0"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: `all 900ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
            }}
          >
            <div className="text-6xl font-medium tracking-[-0.05em] text-crema md:text-8xl">
              <Counter value={s.value} suffix={s.suffix} run={inView} />
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-crema/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
