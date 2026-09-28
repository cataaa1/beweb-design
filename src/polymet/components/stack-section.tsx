import { tools } from "@/polymet/data/beweb-data";

export function StackSection() {
  return (
    <section id="stack" className="relative overflow-hidden bg-bruma text-marino">
      <div className="flex overflow-hidden border-y border-marino/15 py-8 md:py-10">
        <div className="bw-marquee-slow flex shrink-0 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {tools.map((t) => (
                <span
                  key={`${dup}-${t.name}`}
                  className="flex items-center text-5xl font-medium tracking-[-0.04em] md:text-7xl"
                >
                  <span className="px-8">{t.name}</span>
                  <span className="h-3 w-3 bg-ladrillo" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
