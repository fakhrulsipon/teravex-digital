"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShowcaseVisual } from "./showcase-visual";
import { showcase, type ShowcaseItem } from "@/data/content";
import { cn } from "@/lib/utils";

const filters = ["All", "Web", "App", "Marketing"] as const;
type Filter = (typeof filters)[number];

export function PortfolioSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const items: ShowcaseItem[] = filter === "All" ? showcase : showcase.filter((s) => s.category === filter);

  return (
    <section className="relative py-16 sm:py-24">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-full bg-linear-to-b from-transparent via-brand-50/60 to-transparent" />
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              Projects We <span className="text-gradient">Deliver</span>
            </>
          }
          description="A look at the kinds of websites, apps and campaigns we build for growing businesses."
        />

        <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative min-h-10 rounded-full px-5 text-sm font-semibold transition-colors",
                filter === f ? "text-white" : "bg-white text-slate-600 shadow-soft hover:text-brand-700",
              )}
            >
              {filter === f ? (
                <motion.span
                  layoutId="portfolio-filter"
                  className="absolute inset-0 -z-0 rounded-full bg-linear-to-r from-brand-700 to-cyan-500 shadow-glow"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              ) : null}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/services#${item.service}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <ShowcaseVisual type={item.visual} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{item.category}</p>
                        <h3 className="mt-1 text-lg font-bold text-navy-950">{item.title}</h3>
                      </div>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-all group-hover:rotate-45 group-hover:bg-brand-600 group-hover:text-white">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <li key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-slate-600">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Illustrations show the types of projects included in our services.
        </p>
      </div>
    </section>
  );
}
