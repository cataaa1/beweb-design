import { useEffect } from "react";
import { HeroSection } from "@/polymet/components/hero-section";
import { WorkSection } from "@/polymet/components/work-section";
import { ServicesSection } from "@/polymet/components/services-section";
import { StackSection } from "@/polymet/components/stack-section";
import { ProcessSection } from "@/polymet/components/process-section";
import { StatsBand } from "@/polymet/components/stats-band";
import { ContactSection } from "@/polymet/components/contact-section";

export function BewebHome() {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <StackSection />
      <ProcessSection />
      <StatsBand />
      <ContactSection />
    </>
  );
}
