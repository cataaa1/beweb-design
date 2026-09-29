// State-dependent class strings, shared by the .astro markup (initial render) and the
// browser scripts (updates). Conflicting utilities are already resolved, matching what
// tailwind-merge produced in the React version. Tailwind scans this file for classes.

export const headerClass = (scrolled: boolean) =>
  "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 " +
  (scrolled ? "border-b border-bruma/10 bg-marino/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent");

export const mobileMenuClass = (open: boolean) =>
  "overflow-hidden border-t bg-marino transition-[max-height] duration-500 lg:hidden " +
  (open ? "border-bruma/10 max-h-[420px]" : "max-h-0 border-transparent");

export const filterButtonClass = (active: boolean) =>
  "relative pb-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors " +
  (active ? "text-crema" : "text-crema/40 hover:text-crema/80");

export const filterUnderlineClass = (active: boolean) =>
  "absolute bottom-0 left-0 h-px bg-ladrillo transition-all duration-500 " + (active ? "w-full" : "w-0");

export const REVEAL_BASE =
  "transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";

/** Two staggered columns: every second visible card sits lower, without affecting row heights */
export const workLayoutClass = (i: number) => REVEAL_BASE + (i % 2 === 1 ? " md:relative md:top-40" : "");

export const serviceIndexClass = (open: boolean) =>
  "font-mono text-xs transition-colors " + (open ? "text-ladrillo" : "text-crema/40");

export const serviceTitleClass = (open: boolean) =>
  "flex-1 text-3xl font-medium tracking-[-0.035em] transition-all duration-500 md:text-5xl " +
  (open ? "translate-x-2 text-crema" : "text-crema/45 group-hover:text-crema/80");

export const servicePlusClass = (open: boolean) =>
  "h-5 w-5 shrink-0 transition-transform duration-500 " +
  (open ? "rotate-45 text-ladrillo" : "text-crema/60");

export const serviceBodyClass = (open: boolean) =>
  "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]");

/** One of the four figures inside ServiceVisual; `layout` is the figure's own positioning */
export const visualPanelClass = (layout: string, active: boolean) =>
  layout +
  " transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  (active ? "opacity-100 [transform:none]" : "pointer-events-none opacity-0 [transform:translateY(24px)_scale(0.96)]");
