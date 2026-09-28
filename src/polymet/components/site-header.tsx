import { useEffect, useState } from "react";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BewebLogo } from "@/polymet/components/beweb-logo";
import { navLinks } from "@/polymet/data/beweb-data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Argentina/Buenos_Aires",
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-bruma/10 bg-marino/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="text-crema" aria-label="BeWeb inicio">
          <BewebLogo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.14em] text-crema/60 transition-colors hover:text-crema"
            >
              <span className="mr-1.5 text-bruma/40">0{i + 1}</span>
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ladrillo transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] tracking-[0.1em] text-crema/50 xl:inline">
            MDP {time}
          </span>
          <a
            href="#contacto"
            className="group hidden items-center gap-2 bg-ladrillo px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-crema transition-colors hover:bg-crema hover:text-marino sm:inline-flex"
          >
            Hablemos
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-bruma/20 text-crema lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-bruma/10 bg-marino transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0 border-transparent"
        )}
      >
        <nav className="flex flex-col px-5 py-4">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-bruma/10 py-4 text-2xl font-medium tracking-tight text-crema"
            >
              {l.label}
              <span className="font-mono text-xs text-bruma/50">0{i + 1}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
