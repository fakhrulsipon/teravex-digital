import { CalendarCheck, Megaphone, FileBarChart } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { processPhases } from "@/data/content";
import { projectSteps, regularWork, stepsPerPhase } from "@/data/process";

const regularIcons = [Megaphone, FileBarChart];

/** Group the numbered project steps under the 5 phases. */
const timeline = processPhases.map((phase, i) => {
  const start = stepsPerPhase.slice(0, i).reduce((a, b) => a + b, 0);
  return {
    ...phase,
    steps: projectSteps.slice(start, start + (stepsPerPhase[i] ?? 0)).map((label, j) => ({ label, n: start + j + 1 })),
  };
});

const pad = (n: number) => String(n).padStart(2, "0");

/** How we work: 5 short phases and/or the full step-by-step timeline. */
export function ProcessSection({ showPhases = true, showSteps = true }: { showPhases?: boolean; showSteps?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-50/80 to-transparent" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute top-1/3 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <div className="container-page">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              Every Project, <span className="text-gradient">Step by Step</span>
            </>
          }
          description={`${processPhases.length} phases. ${projectSteps.length} steps. Nothing skipped.`}
        />

        {showPhases && !showSteps ? (
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processPhases.map((phase, i) => (
              <StaggerItem key={phase.title}>
                <div className="relative flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-soft">
                  <span className="absolute top-4 right-4 text-xs font-bold text-brand-300">{pad(i + 1)}</span>
                  <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow">
                    <phase.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-navy-950">{phase.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}

        {showSteps ? (
          <>
            <div className="relative mt-20">
              {/* connecting line through the phase icons (desktop) */}
              <div
                aria-hidden="true"
                data-gsap-draw
                className="absolute top-0 right-[10%] left-[10%] hidden h-0.5 rounded-full bg-linear-to-r from-brand-600 via-cyan-400 to-brand-600 opacity-60 lg:block"
              />
              <Stagger as="ul" className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
                {timeline.map((phase, i) => (
                  <StaggerItem as="li" key={phase.title} className="h-full">
                    <article className="spotlight group relative flex h-full flex-col rounded-3xl border border-white bg-white/85 px-5 pt-12 pb-6 shadow-soft ring-1 ring-brand-100/60 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-brand-200">
                      <span className="absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow ring-[6px] ring-brand-50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <phase.icon className="size-6" aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-3 right-4 text-5xl font-extrabold text-brand-50 transition-colors group-hover:text-brand-100"
                      >
                        {pad(i + 1)}
                      </span>

                      <div className="text-center">
                        <p className="text-[0.65rem] font-bold tracking-[0.2em] text-brand-600 uppercase">Phase {pad(i + 1)}</p>
                        <h3 className="mt-1 text-xl font-extrabold text-navy-950">{phase.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground lg:min-h-[2.5em]">{phase.description}</p>
                      </div>

                      <ol className="mt-5 flex flex-col gap-2 border-t border-dashed border-brand-100 pt-5">
                        {phase.steps.map((step) => (
                          <li
                            key={step.n}
                            className="flex items-start gap-2.5 rounded-xl bg-slate-50/80 p-2.5 text-sm font-medium text-slate-700 transition-colors group-hover:bg-brand-50/60"
                          >
                            <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-navy-950 text-[0.65rem] font-bold text-white">
                              {pad(step.n)}
                            </span>
                            <span className="leading-snug">{step.label}</span>
                          </li>
                        ))}
                      </ol>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal className="mt-8">
              <div data-gsap-zoom className="relative isolate flex flex-col gap-5 overflow-hidden rounded-3xl bg-navy-950 p-6 text-white shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div aria-hidden="true" className="absolute -top-20 -left-10 -z-10 size-64 rounded-full bg-brand-600/40 blur-3xl" />
                <div aria-hidden="true" className="absolute -right-10 -bottom-24 -z-10 size-64 rounded-full bg-cyan-500/30 blur-3xl" />
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <CalendarCheck className="size-5 text-cyan-300" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-extrabold">Always running</span>
                    <span className="block text-sm text-white/60">Alongside every project</span>
                  </span>
                </div>
                <ul data-gsap-stagger className="flex flex-wrap gap-2.5">
                  {regularWork.map((w, i) => {
                    const Icon = regularIcons[i] ?? CalendarCheck;
                    return (
                      <li
                        key={w}
                        className="flex items-center gap-2 rounded-full bg-white/10 py-2 pr-4 pl-2 text-sm font-semibold ring-1 ring-white/15 backdrop-blur"
                      >
                        <span className="grid size-6 place-items-center rounded-full bg-linear-to-br from-brand-500 to-cyan-400">
                          <Icon className="size-3.5" aria-hidden="true" />
                        </span>
                        {w}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </>
        ) : null}
      </div>
    </section>
  );
}
