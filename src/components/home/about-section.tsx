import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/section-heading";
import { CheckList } from "@/components/shared/check-list";
import { Reveal } from "@/components/shared/reveal";
import { aboutHighlights, whyChooseUs } from "@/data/content";
import { projectSteps } from "@/data/process";
import teamOffice from "@/assets/images/team-office.jpg";

function TeamPhoto() {
  return (
    <div data-gsap-img className="relative h-full min-h-[24rem] overflow-hidden rounded-3xl shadow-lift lg:min-h-[28rem]">
      <Image
        src={teamOffice}
        alt="A team collaborating on laptops in a modern office"
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
      <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:bottom-6 sm:left-6">
        <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand-600 to-cyan-500 text-white">
          <Workflow className="size-5" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block text-lg font-extrabold text-navy-950">{projectSteps.length}-step</span>
          <span className="block text-xs text-muted-foreground">simple, clear process</span>
        </span>
      </div>
    </div>
  );
}

export function AboutSection() {
  const reasons = whyChooseUs.slice(0, 3);
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <TeamPhoto />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-start justify-center lg:col-span-4">
          <Eyebrow>About Teravex Digital</Eyebrow>
          <h2 data-split className="mt-4 text-3xl leading-tight font-extrabold text-navy-950 sm:text-4xl">
            Your <span className="text-gradient">Digital Partner</span> in Qatar
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            One team for your website, app and marketing — so you can focus on your business.
          </p>
          <CheckList items={aboutHighlights} className="mt-6" />
          <Button asChild variant="brand" size="pill" className="mt-8">
            <Link href="/about">
              About Us
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-3">
          <div className="surface h-full p-6">
            <h3 className="text-xl font-bold text-navy-950">Why Teravex Digital?</h3>
            <ul data-gsap-stagger className="mt-5 flex flex-col gap-5">
              {reasons.map((r) => (
                <li key={r.title} className="flex gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-50 to-cyan-50 text-brand-700 ring-1 ring-brand-100">
                    <r.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-brand-800">{r.title}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{r.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
