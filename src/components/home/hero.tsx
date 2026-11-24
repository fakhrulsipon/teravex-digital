import Link from "next/link";
import { ArrowRight, BadgeCheck, LayoutGrid, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowBackground, DotPattern } from "@/components/shared/background";
import { Eyebrow } from "@/components/shared/section-heading";
import { HeroVisual } from "./hero-visual";
import { serviceStats } from "@/data/services";

/*
 * Entrance animations here use CSS (tw-animate-css) rather than JS so the
 * hero — the Largest Contentful Paint — renders immediately, before hydration.
 */
const enter = "animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700 ease-out";

/** Headline, word by word — each word blurs into focus one after another. */
const headline: { text: string; gradient?: boolean }[][] = [
  [{ text: "Websites" }, { text: "That" }],
  [{ text: "Grow", gradient: true }, { text: "Your" }, { text: "Business" }],
];

export function Hero() {
  return (
    <section data-gsap-hero className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
      <GlowBackground />
      <DotPattern className="top-[60%] left-2 hidden lg:block" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div data-gsap-hero-copy className="flex flex-col items-start">
          <div className={enter}>
            <Eyebrow>
              <MapPin className="size-3.5" aria-hidden="true" />
              Website & App Agency in Qatar
            </Eyebrow>
          </div>

          <h1 className="mt-5 text-[2.65rem] leading-[1.04] font-extrabold tracking-tight text-navy-950 min-[400px]:text-5xl sm:text-6xl xl:text-[4.6rem]">
            {headline.map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => {
                  const index = headline.slice(0, li).flat().length + wi;
                  return (
                    <span key={word.text}>
                      <span
                        className="inline-block animate-blur-in"
                        style={{ animationDelay: `${0.1 + index * 0.09}s` }}
                      >
                        <span className={word.gradient ? "text-gradient" : undefined}>{word.text}</span>
                      </span>
                      {wi < line.length - 1 ? " " : null}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p className={`mt-6 max-w-xl text-base leading-relaxed text-slate-600 delay-100 sm:text-lg ${enter}`}>
            We build websites and mobile apps that bring you more customers — in English & Arabic.
          </p>

          <div
            className={`mt-8 flex w-full flex-col gap-3 delay-200 min-[460px]:w-auto min-[460px]:flex-row ${enter}`}
          >
            <Button asChild variant="brand" size="xl" data-magnetic>
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="soft" size="xl" data-magnetic>
              <Link href="/services">
                <LayoutGrid data-icon="inline-start" className="text-brand-600" />
                Explore Services
              </Link>
            </Button>
          </div>

          <div className={`mt-10 flex items-center gap-4 delay-300 ${enter}`}>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow">
              <BadgeCheck className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-snug text-slate-600">
              <span className="font-semibold text-navy-950">{serviceStats.webServices} website services</span> under one roof
              <br />
              English & Arabic · Great on phones
            </p>
          </div>
        </div>

        <div data-gsap-hero-visual>
          <div className="relative animate-in px-2 duration-1000 ease-out fill-mode-both fade-in zoom-in-95 delay-150 sm:px-6 lg:px-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
