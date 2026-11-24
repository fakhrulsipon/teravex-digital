import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import type { ServiceCategory as ServiceCategoryType } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceCategory({ service, index }: { service: ServiceCategoryType; index: number }) {
  const Icon = service.icon;

  return (
    <section id={service.slug} aria-labelledby={`${service.slug}-title`} className="scroll-mt-40 py-8 sm:py-16">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
        <Reveal className="lg:sticky lg:top-40 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-7">
            <div
              aria-hidden="true"
              className={cn("absolute -top-16 -right-16 size-48 rounded-full bg-linear-to-br opacity-15 blur-2xl", service.accent)}
            />
            <div className="relative flex items-center gap-3">
              <span
                className={cn("grid size-13 place-items-center rounded-2xl bg-linear-to-br text-white shadow-md", service.accent)}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {String(index + 1).padStart(2, "0")} / Service
              </span>
            </div>
            <h2 id={`${service.slug}-title`} data-split className="relative mt-5 text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {service.name}
            </h2>
            <p className="relative mt-2 font-medium text-brand-700">{service.tagline}</p>
            <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>

            <p className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              {service.subServices.length} services included
            </p>

            <Button asChild variant="brand" size="pill" className="relative mt-6 w-full">
              <Link href={`/contact?service=${service.slug}`}>
                Get a Free Quote
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Stagger className="grid content-start gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {service.subServices.map((sub, i) => (
            <StaggerItem key={sub.name}>
              <article className="spotlight group flex h-full flex-col rounded-3xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-6">
                <div className="hidden items-center justify-between sm:flex">
                  <span className="text-4xl font-extrabold text-brand-100 transition-colors group-hover:text-brand-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("h-1.5 w-10 rounded-full bg-linear-to-r", service.accent)} />
                </div>
                <h3 className="flex items-center gap-2.5 text-base font-bold text-navy-950 sm:mt-3 sm:text-lg">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-xs font-extrabold text-brand-600 sm:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {sub.name}
                </h3>
                <ul className="mt-3 flex flex-col gap-2 border-t border-border pt-3 sm:mt-4 sm:gap-2.5 sm:pt-4">
                  {sub.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2.5} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
