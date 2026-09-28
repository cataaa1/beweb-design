import { ArrowUpIcon } from "lucide-react";
import { navLinks } from "@/polymet/data/beweb-data";
import { PixelField } from "@/polymet/components/pixel-field";
import { BewebLogo } from "@/polymet/components/beweb-logo";

const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Behance", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-marino-deep text-crema">
      <div className="relative h-40 md:h-56">
        <PixelField cell={9} speed={0.6} />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-10 border-t border-bruma/15 py-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <p className="max-w-sm text-lg leading-snug text-crema/70">
              Cada proyecto es único. Nos tomamos el tiempo de entender tu negocio para crear
              soluciones que realmente marcan la diferencia.
            </p>
          </div>
          <nav className="md:col-span-2">
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-crema/60 transition-colors hover:text-crema">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-2 md:col-span-2">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-sm text-crema/60 transition-colors hover:text-crema">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="col-span-2 flex items-start md:col-span-3 md:justify-end">
            <a
              href="#top"
              className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-crema/60 hover:text-crema"
            >
              Volver arriba
              <span className="grid h-9 w-9 place-items-center border border-crema/25 transition-colors group-hover:border-ladrillo group-hover:bg-ladrillo">
                <ArrowUpIcon className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] select-none px-5 pb-4 pt-6 md:px-10">
        <BewebLogo className="h-auto w-full" weight={2.2} />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.14em] text-crema/40 md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} BeWeb · Agencia de diseño y desarrollo web</span>
        <span>Mar del Plata, Argentina</span>
      </div>
    </footer>
  );
}
