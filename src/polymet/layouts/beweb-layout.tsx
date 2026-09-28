import type { ReactNode } from "react";
import { SiteHeader } from "@/polymet/components/site-header";
import { SiteFooter } from "@/polymet/components/site-footer";

interface BewebLayoutProps {
  children: ReactNode;
}

export function BewebLayout({ children }: BewebLayoutProps) {
  return (
    <div className="min-h-screen bg-marino font-sans text-crema antialiased [scroll-behavior:smooth]">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
