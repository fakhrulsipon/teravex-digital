import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { QatarSection } from "@/components/home/qatar-section";
import { AboutSection } from "@/components/home/about-section";
import { ImpactSection } from "@/components/home/impact-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/shared/cta-section";
import { GsapEffects } from "@/components/layout/gsap-effects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <QatarSection />
      <ImpactSection />
      <AboutSection />
      <TestimonialsSection />
      <CtaSection />
      <GsapEffects />
    </>
  );
}
