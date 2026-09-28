import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { projects } from "@/polymet/data/beweb-data";
import { ProjectCard } from "@/polymet/components/project-card";
import { Reveal, SplitLines } from "@/polymet/components/reveal";

const FILTERS = ["Todos", "Institucional", "E-commerce", "Landing"];

export function WorkSection() {
  const [filter, setFilter] = useState("Todos");

  const list = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.type === filter)),
    [filter]
  );

  return (
    <section id="proyectos" className="relative bg-marino pb-28 md:pb-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-8 border-t border-bruma/15 pt-10 md:flex-row md:items-end md:justify-between">
          <h2 className="text-5xl font-medium tracking-[-0.045em] text-crema md:text-7xl">
            <SplitLines lines={["Sitios que construimos"]} />
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2" role="tablist">
            {FILTERS.map((f) => {
              const count = f === "Todos" ? projects.length : projects.filter((p) => p.type === f).length;
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative pb-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                    active ? "text-crema" : "text-crema/40 hover:text-crema/80"
                  )}
                >
                  {f}
                  <sup className="ml-1 text-[9px] text-bruma/60">{count}</sup>
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-ladrillo transition-all duration-500",
                      active ? "w-full" : "w-0"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-12">
          {list.map((p, i) => {
            const layout = filter !== "Todos" ? "md:col-span-6" : [
              "md:col-span-7",
              "md:col-span-5 md:mt-40",
              "md:col-span-5 md:col-start-2",
              "md:col-span-6 md:mt-24",
              "md:col-span-6",
              "md:col-span-5 md:col-start-8 md:-mt-20",
            ][i % 6];
            return (
              <Reveal key={p.id} className={layout} delay={(i % 2) * 120}>
                <ProjectCard project={p} index={projects.indexOf(p)} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
