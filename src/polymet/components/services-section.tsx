import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/polymet/data/beweb-data";
import { ServiceVisual } from "@/polymet/components/service-visual";
import { SplitLines } from "@/polymet/components/reveal";

export function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="servicios" className="relative bg-marino-2 py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-y-10">
          <h2 className="col-span-12 text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-crema md:col-span-7 md:text-7xl">
            <SplitLines lines={["Cuatro formas", "de trabajar juntos."]} />
          </h2>
          <p className="col-span-12 self-end text-base leading-relaxed text-crema/60 md:col-span-4 md:col-start-9">
            Desde una landing hasta una plataforma completa. Un solo equipo diseña, desarrolla y
            mantiene, sin intermediarios.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            {services.map((s, i) => {
              const open = active === i;
              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setActive(i)}
                  className="border-t border-bruma/15 last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="group flex w-full items-baseline gap-6 py-7 text-left"
                  >
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors",
                        open ? "text-ladrillo" : "text-crema/40"
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-3xl font-medium tracking-[-0.035em] transition-all duration-500 md:text-5xl",
                        open ? "translate-x-2 text-crema" : "text-crema/45 group-hover:text-crema/80"
                      )}
                    >
                      {s.title}
                    </span>
                    <PlusIcon
                      className={cn(
                        "h-5 w-5 shrink-0 text-crema/60 transition-transform duration-500",
                        open && "rotate-45 text-ladrillo"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-8 pb-10 pl-10 md:grid-cols-2 md:pl-12">
                        <p className="text-lg leading-snug text-crema/80">{s.lead}</p>
                        <div className="space-y-5">
                          <ul className="space-y-1.5">
                            {s.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-3 text-sm text-crema/70">
                                <span className="h-1 w-3 bg-bruma/50" />
                                {d}
                              </li>
                            ))}
                          </ul>
                          <p className="font-mono text-[11px] text-bruma/70">{s.tools.join("  ·  ")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-span-12 mt-12 lg:col-span-5 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              <ServiceVisual active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
