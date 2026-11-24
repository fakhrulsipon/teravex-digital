import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight, Eye, Languages, Rocket, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowBackground, DotPattern } from "@/components/shared/background";
import { SectionHeading, Eyebrow } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { CheckList } from "@/components/shared/check-list";
import { CountUp } from "@/components/shared/count-up";
import { ProcessSection } from "@/components/shared/process-section";
import { whyChooseUs } from "@/data/content";
import { getService } from "@/data/services";
import { projectSteps } from "@/data/process";
import { projects } from "@/data/projects";
import type { ServiceSlug } from "@/types";
import { cn } from "@/lib/utils";
import developerCode from "@/assets/images/developer-code.jpg";
import designStudio from "@/assets/images/design-studio.jpg";
import mobileApp from "@/assets/images/mobile-app.jpg";
import analyticsLaptop from "@/assets/images/analytics-laptop.jpg";
import wireframe from "@/assets/images/wireframe.jpg";
import devWorkspace from "@/assets/images/dev-workspace.jpg";
import clientMeeting from "@/assets/images/client-meeting.jpg";
import { GsapEffects } from "@/components/layout/gsap-effects";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Teravex Digital is a web development agency in Qatar building fast, bilingual websites and mobile apps for growing businesses.",
  alternates: { canonical: "/about" },
};

const heroStats = [
  { value: String(projects.length), label: "Live projects" },
  { value: "2", label: "Languages" },
  { value: String(projectSteps.length), label: "Simple steps" },
];

interface BuildCard {
  slug: ServiceSlug;
  title: string;
  line: string;
  image: StaticImageData;
  alt: string;
  tag: string;
  /** object-position so the subject sits above the text */
  position: string;
}

const webCount = getService("website-development").subServices.length;
const appCount = getService("mobile-app-development").subServices.length;

const buildCards: BuildCard[] = [
  {
    slug: "website-development",
    title: "Websites",
    line: "Business sites, online stores and landing pages in English & Arabic.",
    image: designStudio,
    alt: "Website designs on two desktop monitors in a design studio",
    tag: `${webCount} website services`,
    position: "object-center",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Apps",
    line: "Android & iOS apps your customers love.",
    image: mobileApp,
    alt: "Hand holding a smartphone showing a modern app screen",
    tag: `${appCount} app services`,
    position: "object-[50%_15%]",
  },
  {
    slug: "seo",
    title: "Marketing",
    line: "Google, Instagram & social media to bring customers.",
    image: analyticsLaptop,
    alt: "Laptop showing an analytics dashboard",
    tag: "SEO · Ads · Social · Email",
    position: "object-[50%_20%]",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <GlowBackground />
        <DotPattern className="top-40 left-4 hidden md:block" />
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <Reveal className="flex flex-col items-start">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="font-medium text-brand-800">
                  About Us
                </li>
              </ol>
            </nav>
            <Eyebrow className="mt-5">About Teravex Digital</Eyebrow>
            <h1 data-split className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-navy-950 sm:text-5xl xl:text-6xl">
              We Build Websites <br className="hidden sm:block" />
              That <span className="text-gradient">Work for Qatar</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              We build websites and apps for growing businesses — fast, in English & Arabic, and made to last.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="xl">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
            <dl className="mt-10 grid w-full max-w-md grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white/80 py-4 shadow-soft backdrop-blur">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col items-center px-2 text-center">
                  <dt className="order-last text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Bento collage */}
          <Reveal delay={0.1} className="relative">
            <div className="grid h-[26rem] grid-cols-5 grid-rows-6 gap-3 sm:h-[32rem] sm:gap-4">
              <div data-gsap-img className="relative col-span-3 row-span-6 overflow-hidden rounded-[1.75rem] shadow-lift">
                <Image
                  src={developerCode}
                  alt="Developer writing code on a laptop while testing on a phone"
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div data-gsap-img className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.75rem] shadow-lift">
                <Image
                  src={designStudio}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div data-gsap-img className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.75rem] shadow-lift">
                <Image
                  src={mobileApp}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover object-[35%_50%]"
                />
              </div>
            </div>

            <div className="animate-float absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:left-8">
              <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand-600 to-cyan-500 text-white">
                <Languages className="size-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-extrabold text-navy-950">English & Arabic</span>
                <span className="block text-xs text-muted-foreground">Every website & app</span>
              </span>
            </div>
            <div className="animate-float absolute -top-4 right-4 flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3.5 py-2 shadow-lift backdrop-blur [animation-delay:-3s]">
              <Rocket className="size-4 text-brand-600" aria-hidden="true" />
              <span className="text-xs font-bold text-navy-950">Fast · Secure · Easy to use</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── What we build ───────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Build"
            title={
              <>
                Digital Products, <span className="text-gradient">Done Right</span>
              </>
            }
            description="Websites, mobile apps and marketing — all under one roof."
          />
          <Stagger className="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
            {buildCards.map((card, i) => (
              <StaggerItem key={card.slug} className={cn(i === 0 && "lg:col-span-2 lg:row-span-2")}>
                <Link
                  href={`/services#${card.slug}`}
                  data-tilt
                  className={cn(
                    "group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 text-white shadow-lift sm:p-8",
                    i === 0 ? "min-h-[24rem] lg:min-h-[34rem]" : "min-h-[16rem]",
                  )}
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    placeholder="blur"
                    sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                    className={cn("-z-10 object-cover transition-transform duration-700 group-hover:scale-105", card.position)}
                  />
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 -z-10 bg-linear-to-t from-navy-950 to-navy-950/5",
                      i === 0 ? "via-navy-950/55" : "via-navy-950/85",
                    )}
                  />
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className={cn("font-extrabold", i === 0 ? "text-3xl sm:text-4xl" : "text-2xl")}>{card.title}</h3>
                      <p className={cn("mt-2 max-w-md text-white/75", i === 0 ? "text-base sm:text-lg" : "text-sm")}>
                        {card.line}
                      </p>
                      <p className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25 backdrop-blur">
                        {card.tag}
                      </p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-navy-950 transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ───────── Story ───────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-last pb-10 lg:order-first lg:pr-10">
            <div data-gsap-img className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift">
              <Image
                src={devWorkspace}
                alt="Developer workspace with code on a laptop screen"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
            <div data-gsap-img className="absolute right-0 bottom-0 w-[48%] overflow-hidden rounded-2xl border-4 border-white shadow-lift">
              <div className="relative aspect-[4/3]">
                <Image
                  src={wireframe}
                  alt="Website wireframe sketches on paper"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 22vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Who we are</Eyebrow>
            <h2 data-split className="mt-4 text-3xl leading-tight font-extrabold text-navy-950 sm:text-4xl">
              From sketch to <span className="text-gradient">live website</span>
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Designers, developers and marketers in one team — everything your business needs online, in one place.
            </p>
            <CheckList
              className="mt-6"
              size="md"
              items={[
                "Planned around your goals",
                "Tested and checked before launch",
                "Launched without any hassle",
                "Kept safe and up to date",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ───────── Mission & vision ───────── */}
      <section className="px-3 py-8 sm:px-4">
        <Reveal>
          <div data-gsap-zoom className="relative isolate mx-auto grid max-w-[84rem] overflow-hidden rounded-[2rem] bg-navy-950 shadow-lift lg:grid-cols-[1fr_1.15fr]">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute -top-28 right-1/4 size-96 rounded-full bg-brand-600/40 blur-3xl" />
              <div className="absolute -right-20 -bottom-28 size-96 rounded-full bg-cyan-500/25 blur-3xl" />
            </div>
            <div className="relative min-h-[20rem] lg:min-h-[34rem]">
              <Image
                src={clientMeeting}
                alt="Two professionals discussing a project on laptops by a window"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_35%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-950/60 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-navy-950/40" />
            </div>
            <div className="flex flex-col justify-center gap-6 p-7 sm:p-12">
              <Eyebrow tone="dark" className="w-fit">
                Why we exist
              </Eyebrow>
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "Help Qatar businesses grow online with great websites and apps — built to last.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "Be the web partner Qatar trusts for everything online.",
                },
              ].map((card) => (
                <article key={card.title} className="flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow">
                    <card.icon className="size-5.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{card.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-white/70">{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────── Why choose ───────── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Teravex Digital"
            title={
              <>
                Why Clients <span className="text-gradient">Choose Us</span>
              </>
            }
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-7">
                  <span className="absolute top-5 right-6 text-5xl font-extrabold text-brand-50 transition-colors group-hover:text-brand-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow">
                    <item.icon className="size-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-bold text-navy-950">{item.title}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ProcessSection showPhases={false} />
      <GsapEffects />
    </>
  );
}
