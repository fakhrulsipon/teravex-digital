import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              Real Projects, <span className="text-gradient">Live Online</span>
            </>
          }
          description="Websites we designed, built and launched. Click to see them live."
        />

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem as="li" key={project.name}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — visit live site (opens in a new tab)`}
                className="spotlight group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="relative bg-linear-to-br from-brand-700 via-brand-600 to-cyan-500 p-4 pb-0 sm:p-6 sm:pb-0">
                  <div className="overflow-hidden rounded-t-xl bg-white shadow-lift ring-1 ring-white/30">
                    <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
                      <span className="size-2 rounded-full bg-rose-300" />
                      <span className="size-2 rounded-full bg-amber-300" />
                      <span className="size-2 rounded-full bg-emerald-300" />
                      <span className="ml-2 truncate text-[0.65rem] text-slate-400">{new URL(project.live).hostname}</span>
                    </div>
                    <div data-gsap-img className="relative aspect-[16/8] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.name} homepage screenshot`}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-semibold text-emerald-700 shadow-soft sm:top-4 sm:right-4">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    Live
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{project.tag}</p>
                      <h3 className="mt-1 text-xl font-bold text-navy-950">{project.name}</h3>
                      <p className="text-sm font-medium text-slate-500">{project.subtitle}</p>
                    </div>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <ul aria-label="Features" className="mt-4 flex flex-wrap gap-1.5">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-slate-600"
                      >
                        <Check className="size-3 text-brand-600" strokeWidth={3} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Visit website
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
