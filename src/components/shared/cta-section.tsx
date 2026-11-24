import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { siteConfig } from "@/data/site";

const trustPoints = ["Free quote", "Clear plan & timeline", "English & Arabic"];

/** Compact call-to-action band shown at the bottom of the home page. */
export function CtaSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <Reveal>
        <div data-gsap-zoom className="glow-border relative isolate overflow-hidden rounded-3xl bg-navy-950 px-6 py-9 shadow-lift sm:px-10 sm:py-10 lg:px-12">
          {/* Colour glow + fine grid */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -left-16 h-64 w-96 rounded-full bg-brand-600/45 blur-[90px]" />
            <div className="absolute -right-16 -bottom-24 h-64 w-80 rounded-full bg-violet-600/30 blur-[90px]" />
            <div className="absolute top-1/2 right-1/3 h-40 w-56 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[80px]" />
            <div className="absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px)] bg-size-[36px_36px] mask-[radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
          </div>

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="text-center lg:text-left">
              <h2 data-split className="text-2xl font-extrabold text-white sm:text-3xl">
                Ready for Your{" "}
                <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-violet-300 bg-size-[200%_100%] bg-clip-text text-transparent motion-safe:animate-[gradient-pan_8s_ease-in-out_infinite]">
                  New Website?
                </span>
              </h2>
              <p className="mt-2 text-sm text-white/70 sm:text-base">
                Tell us about your business. We&apos;ll reply with a clear plan and timeline.
              </p>
              <ul data-gsap-stagger className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/60 sm:text-sm lg:justify-start">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-cyan-300" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="brand" size="xl" className="shadow-glow" data-magnetic>
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-emerald-400/40 bg-emerald-500/10 text-emerald-100 backdrop-blur hover:border-emerald-400/70 hover:bg-emerald-500/20 hover:text-white"
              >
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle data-icon="inline-start" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
