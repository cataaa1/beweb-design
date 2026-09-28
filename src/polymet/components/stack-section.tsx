import { useCallback, useEffect, useRef, useState } from "react";
import { tools } from "@/polymet/data/beweb-data";
import { Keycap } from "@/polymet/components/keycap";
import { Reveal, SplitLines } from "@/polymet/components/reveal";

const TONE_BY_NAME: Record<string, "marino" | "ladrillo" | "acero"> = {
  "AI / ChatGPT": "ladrillo",
  "Next.js": "marino",
  PostgreSQL: "acero",
  Shopify: "marino",
  Docker: "acero",
};

const ROWS = [tools.slice(0, 6), tools.slice(6, 11), tools.slice(11, 16)];

export function StackSection() {
  const [pressed, setPressed] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const press = useCallback((name: string) => {
    setPressed(name);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPressed(null), 180);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k.length !== 1) return;
      const matches = tools.filter((t) => t.short.toLowerCase().startsWith(k));
      if (matches.length) press(matches[Math.floor(Math.random() * matches.length)].name);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer.current);
    };
  }, [press]);

  return (
    <section id="stack" className="relative overflow-hidden bg-bruma py-28 text-marino md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-y-8">
          <h2 className="col-span-12 text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:col-span-8 md:text-7xl">
            <SplitLines lines={["Herramientas que", "dominamos a diario."]} />
          </h2>
          <Reveal className="col-span-12 self-end md:col-span-4" delay={200}>
            <p className="text-base leading-relaxed text-marino/70">
              Elegimos la tecnología según el proyecto, no al revés. Todo lo que ves acá corre hoy en
              sitios de clientes.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-5 md:space-y-7">
          {ROWS.map((row, r) => (
            <Reveal key={r} delay={r * 120}>
              <div
                className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:gap-6"
                style={{ paddingLeft: r === 1 ? "clamp(0px, 4vw, 70px)" : r === 2 ? "clamp(0px, 8vw, 140px)" : 0 }}
              >
                {row.map((t) => (
                  <Keycap
                    key={t.name}
                    tool={t}
                    tone={TONE_BY_NAME[t.name] ?? "crema"}
                    pressed={pressed === t.name}
                    onPress={() => press(t.name)}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-marino/50">
          Tocá una tecla
        </p>
      </div>

      <div className="mt-24 flex overflow-hidden border-y border-marino/15 py-6">
        <div className="bw-marquee-slow flex shrink-0 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {tools.map((t) => (
                <span key={`${dup}-${t.name}`} className="flex items-center text-5xl font-medium tracking-[-0.04em] md:text-7xl">
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
