"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Star } from "lucide-react";
import { Eyebrow } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { clientPromises, testimonials } from "@/data/content";
import { cn } from "@/lib/utils";

interface Slide {
  quote: string;
  heading: string;
  sub: string;
  rating?: number;
}

/**
 * Shows real testimonials when `testimonials` (src/data/content.ts) has entries.
 * Until then it shows Teravex Digital's client promises — no invented reviews.
 */
const hasReviews = testimonials.length > 0;
const slides: Slide[] = hasReviews
  ? testimonials.map((t) => ({
      quote: t.quote,
      heading: t.name,
      sub: `${t.role}, ${t.company}`,
      rating: t.rating,
    }))
  : clientPromises.map((p) => ({ quote: p.quote, heading: p.title, sub: p.step }));

export function TestimonialsSection() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + slides.length) % slides.length, dir]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(id);
  }, [go, paused]);

  const slide = slides[index];

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal className="flex flex-col items-start">
          <Eyebrow>{hasReviews ? "Testimonials" : "Our Promise"}</Eyebrow>
          <h2 data-split className="mt-4 text-3xl leading-tight font-extrabold text-navy-950 sm:text-4xl">
            {hasReviews ? (
              <>
                What Our <span className="text-gradient">Clients Say</span>
              </>
            ) : (
              <>
                What Every Client <span className="text-gradient">Can Expect</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-slate-600">
            {hasReviews
              ? "Real stories. Real results."
              : "What you get on every project with us."}
          </p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="grid size-12 place-items-center rounded-full border border-border bg-white text-navy-950 shadow-soft transition-all hover:border-brand-200 hover:text-brand-700"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="grid size-12 place-items-center rounded-full bg-brand-600 text-white shadow-glow transition-all hover:bg-brand-700"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div aria-hidden="true" className="absolute inset-x-6 -bottom-4 h-full rounded-3xl bg-brand-100/60" />
            <div aria-hidden="true" className="absolute inset-x-3 -bottom-2 h-full rounded-3xl bg-brand-50" />
            <div
              className="relative min-h-[19rem] overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-lift sm:min-h-[17rem] sm:p-10"
              aria-roledescription="carousel"
              aria-live={paused ? "polite" : "off"}
            >
              <Quote className="size-10 fill-brand-600 text-brand-600" aria-hidden="true" />
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-5"
                >
                  <blockquote className="text-lg leading-relaxed font-medium text-navy-950 sm:text-xl">
                    &ldquo;{slide.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-brand-600 to-cyan-500 text-white">
                        <ShieldCheck className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-bold text-navy-950">{slide.heading}</span>
                        <span className="block text-sm text-muted-foreground">{slide.sub}</span>
                      </span>
                    </span>
                    {slide.rating ? (
                      <span className="flex gap-0.5" aria-label={`${slide.rating} out of 5 stars`}>
                        {Array.from({ length: slide.rating }).map((_, i) => (
                          <Star key={i} className="size-4.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                        ))}
                      </span>
                    ) : (
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                        Teravex Digital promise
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.heading}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === index}
                  className="grid size-6 place-items-center"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-brand-600" : "w-2 bg-brand-200",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
