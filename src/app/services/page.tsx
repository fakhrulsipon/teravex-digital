import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ServiceNav } from "@/components/services/service-nav";
import { ServiceCategory } from "@/components/services/service-category";
import { ProcessSection } from "@/components/shared/process-section";
import { services } from "@/data/services";
import { GsapEffects } from "@/components/layout/gsap-effects";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, mobile apps, Google & social media ads, SEO and email marketing for businesses in Qatar.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow="Our Services"
        title={
          <>
            Everything Online, <span className="text-gradient">One Team</span>
          </>
        }
        description="Websites, mobile apps and marketing — everything your business needs online."
      />
      <div>
        <ServiceNav />
        <div className="pt-4">
          {services.map((service, i) => (
            <ServiceCategory key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
      <ProcessSection showSteps={false} />
      <GsapEffects />
    </>
  );
}
