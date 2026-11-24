import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/data/site";
import qatarClient from "@/assets/images/qatar-client.jpg";
import { GsapEffects } from "@/components/layout/gsap-effects";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Teravex Digital in Doha, Qatar for a free quote on your website, mobile app or digital marketing.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: siteConfig.contact.whatsapp,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.contact.location,
  },
];

function FormSkeleton() {
  return (
    <div className="h-[40rem] animate-pulse rounded-3xl border border-border bg-white p-9 shadow-lift">
      <div className="h-8 w-2/3 rounded-lg bg-muted" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-muted" />
        ))}
        <div className="h-12 rounded-xl bg-muted sm:col-span-2" />
        <div className="h-36 rounded-xl bg-muted sm:col-span-2" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Contact Us"
        title={
          <>
            Get Your <span className="text-gradient">Free Quote</span>
          </>
        }
        description="Tell us what you need. We'll reply with a clear plan."
      />

      <section className="pb-20 sm:pb-24">
        <div className="container-page grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          {/* Phone users: the fastest way to reach us, before the form */}
          <div className="flex flex-col gap-3 lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              <Button asChild size="xl" className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle data-icon="inline-start" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="soft" size="xl" className="w-full">
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone data-icon="inline-start" />
                  Call Us
                </a>
              </Button>
            </div>
            <p className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase">or fill in the form</p>
          </div>
          <Reveal>
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div data-gsap-img className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={qatarClient}
                alt="Business owner in a white thobe working on a laptop"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover object-[60%_30%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-950/70 to-transparent" />
              <p className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-semibold text-navy-950 shadow-soft">
                <MapPin className="size-4 text-brand-600" aria-hidden="true" />
                {siteConfig.contact.location}
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        {label}
                      </span>
                      <span className="block font-semibold break-words text-navy-950">{value}</span>
                    </span>
                  </>
                );
                const cls =
                  "flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all";
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`${cls} hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={cls}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>
      <GsapEffects />
    </>
  );
}
