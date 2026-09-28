import { useEffect, useRef } from "react";
import { ArrowDownIcon } from "lucide-react";
import { PixelField } from "@/polymet/components/pixel-field";
import { DeployTicker } from "@/polymet/components/deploy-ticker";
import { SplitLines, Reveal } from "@/polymet/components/reveal";

export function HeroSection() {
  const statementRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * -0.12}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-marino pt-16">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 px-5 md:px-10">
        <h1 className="col-span-12 pb-10 pt-14 text-[15vw] font-medium uppercase leading-[0.86] tracking-[-0.055em] text-crema md:col-span-8 md:pb-14 md:pt-20 md:text-[8.6vw] xl:text-[128px]">
          <SplitLines lines={["¿Qué", "necesitás?"]} />
        </h1>

        <div className="col-span-12 flex flex-col justify-between gap-8 border-t border-bruma/15 py-8 md:col-span-4 md:border-l md:border-t-0 md:py-20 md:pl-10">
          <Reveal delay={250}>
            <p className="bw-justify font-mono text-[13px] uppercase leading-[1.55] tracking-[0.08em] text-crema">
              Agencia de diseño y desarrollo web
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex items-end justify-between gap-6">
              <span className="font-mono text-[10px] leading-4 text-bruma/50">
                38.0055° S<br />57.5426° O
              </span>
              <p className="max-w-[240px] text-right text-sm leading-snug text-crema/70">
                Soluciones digitales completas desde Mar del Plata, desde la idea hasta la
                implementación.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative h-[58vh] min-h-[380px] w-full md:h-[64vh]">
        <PixelField />
        <div className="pointer-events-none absolute inset-0 bw-grid-bg" />

        <div className="absolute right-5 top-6 hidden md:right-10 md:block bw-float">
          <DeployTicker />
        </div>

        <a
          href="#proyectos"
          className="absolute bottom-6 left-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-crema/70 transition-colors hover:text-crema md:left-10"
        >
          <span className="grid h-9 w-9 place-items-center border border-crema/30 bg-marino/60 backdrop-blur">
            <ArrowDownIcon className="h-3.5 w-3.5" />
          </span>
          Ver proyectos
        </a>
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-[1440px] px-5 pb-24 md:-mt-32 md:px-10 md:pb-36">
        <p
          ref={statementRef}
          className="max-w-[1000px] text-[28px] font-normal leading-[1.08] tracking-[-0.03em] text-crema will-change-transform md:ml-[16.66%] md:text-[46px]"
        >
          Sitios institucionales que comuniquen tu marca, landing pages rápidas y efectivas y
          tiendas online que vendan 24/7. <span className="text-bruma">¿Estás listo? Estos son algunos proyectos:</span>
        </p>
      </div>
    </section>
  );
}
