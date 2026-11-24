import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Languages, MessageCircle, Search, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { DotPattern } from "@/components/shared/background";
import { getService, growthServices } from "@/data/services";
import { cn } from "@/lib/utils";
import sitebari from "@/assets/projects/sitebari.png";
import mailbari from "@/assets/projects/mailbari.png";

const shots = [
  { host: "sitebari.com", image: sitebari },
  { host: "mailbari.com", image: mailbari },
];

/** Shown in the website card: what every website comes with. */
const included = [
  { icon: Languages, label: "English & Arabic" },
  { icon: Smartphone, label: "Great on phones" },
  { icon: Zap, label: "Fast loading" },
  { icon: ShieldCheck, label: "Safe & secure" },
  { icon: MessageCircle, label: "WhatsApp button" },
  { icon: Search, label: "Ready for Google" },
];

const web = getService("website-development");
const app = getService("mobile-app-development");

/** Home "services" block: websites, mobile apps and marketing services. */
/** Stretch the items of an incomplete last row so the 4-column (desktop) grid has no empty cells. */
function lastRowSpan(i: number, n: number) {
  const rem = n % 4;
  const fromEnd = n - i;
  if (rem === 1 && fromEnd === 1) return "lg:col-span-4";
  if (rem === 2 && fromEnd <= 2) return "lg:col-span-2";
  if (rem === 3 && fromEnd === 1) return "lg:col-span-2";
  return undefined;
}

export function ServicesSection() {
  return (
    <section id="services" className="relative py-16 sm:py-24">
      <DotPattern className="top-24 right-4 hidden lg:block" />
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Build"
          title={
            <>
              Websites, Apps <span className="text-gradient">&amp; More</span>
            </>
          }
          description="Every kind of website and app — all in one place."
        />

        {/* Website */}
        <Reveal className="mt-12">
          <article className="glow-border relative isolate overflow-hidden rounded-[2rem] bg-navy-950 text-white shadow-lift">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute -top-24 -left-20 size-96 rounded-full bg-brand-600/50 blur-3xl" />
              <div className="absolute -right-16 -bottom-24 size-96 rounded-full bg-cyan-500/30 blur-3xl" />
            </div>

            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <div className="relative flex flex-col p-7 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className={cn("grid size-12 place-items-center rounded-2xl bg-linear-to-br shadow-glow", web.accent)}>
                    <web.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-extrabold sm:text-4xl">{web.name}</h3>
                </div>
                <p className="mt-4 max-w-md text-white/70 sm:text-lg">{web.tagline}</p>
                <div className="mt-8">
                  <Button asChild variant="brand" size="xl" className="ring-1 ring-white/20">
                    <Link href={`/contact?service=${web.slug}`}>
                      Start Your Website
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-auto hidden pt-10 md:block">
                  <p className="text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">Every website includes</p>
                  <ul data-gsap-stagger className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-3">
                    {included.map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-white/85 ring-1 ring-white/10 backdrop-blur"
                      >
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-br from-brand-500 to-cyan-400 text-white">
                          <Icon className="size-3.5" aria-hidden="true" />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div data-gsap-slide className="relative hidden flex-col justify-center gap-5 py-10 pl-2 md:flex">
                {shots.map((shot, i) => (
                  <div
                    key={shot.host}
                    className={cn(
                      "overflow-hidden rounded-l-xl bg-white shadow-lift ring-1 ring-white/20",
                      i === 0 && "ml-8 lg:ml-12",
                    )}
                  >
                    <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-1.5">
                      <span className="size-1.5 rounded-full bg-rose-300" />
                      <span className="size-1.5 rounded-full bg-amber-300" />
                      <span className="size-1.5 rounded-full bg-emerald-300" />
                      <span className="ml-2 text-[0.6rem] text-slate-400">{shot.host}</span>
                    </div>
                    <Image
                      src={shot.image}
                      alt={`${shot.host} website built by Teravex Digital`}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 34vw, 45vw"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <ul data-gsap-stagger className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 lg:grid-cols-4">
              {web.subServices.map((sub, i) => (
                <li key={sub.name} className={cn("flex items-start gap-2 bg-navy-950/90 p-3.5 sm:gap-3 sm:p-5", lastRowSpan(i, web.subServices.length))}>
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan-400/20 text-cyan-300">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.8rem] leading-snug font-semibold sm:text-sm">{sub.name}</span>
                    <span className="mt-0.5 hidden text-xs text-white/55 sm:block">{sub.features[0]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* Mobile app */}
        <Reveal className="mt-6">
          <article className="spotlight grid gap-8 rounded-[2rem] border border-border bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <span className={cn("grid size-12 place-items-center rounded-2xl bg-linear-to-br text-white shadow-md", app.accent)}>
                <app.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-navy-950 sm:text-3xl">{app.name}</h3>
              <p className="mt-2 text-muted-foreground">{app.tagline}</p>
              <Button asChild variant="soft" size="xl" className="mt-6">
                <Link href={`/contact?service=${app.slug}`}>
                  Build Your App
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <ul className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3">
              {app.subServices.map((sub) => (
                <li
                  key={sub.name}
                  className="flex items-center gap-2 rounded-2xl bg-muted/60 p-2.5 text-[0.8rem] leading-snug font-semibold text-slate-700 sm:gap-3 sm:p-3.5 sm:text-sm"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 sm:size-6">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {sub.name}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* Marketing */}
        <div className="mt-10">
          <p className="text-center text-sm font-semibold text-muted-foreground">Marketing services to bring more customers</p>
          <Stagger as="ul" className="mt-4 flex flex-wrap justify-center gap-2.5">
            {growthServices.map((s) => (
              <StaggerItem as="li" key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pr-4 pl-1.5 text-sm font-semibold text-slate-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
                >
                  <span className={cn("grid size-7 place-items-center rounded-full bg-linear-to-br text-white", s.accent)}>
                    <s.icon className="size-3.5" aria-hidden="true" />
                  </span>
                  {s.shortName}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
