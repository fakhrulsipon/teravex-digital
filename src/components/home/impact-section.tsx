import { Globe, Languages, Rocket, TrendingUp, Workflow } from "lucide-react";
import { CountUp } from "@/components/shared/count-up";
import { Reveal } from "@/components/shared/reveal";
import { impactStats } from "@/data/content";

const icons = [Rocket, Globe, Languages, Workflow];

export function ImpactSection() {
  return (
    <section aria-labelledby="impact-title" className="px-3 sm:px-4">
      <Reveal>
        <div data-gsap-zoom className="relative isolate mx-auto max-w-[84rem] overflow-hidden rounded-3xl bg-navy-950 px-6 py-10 shadow-lift sm:px-10 lg:py-12">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -top-28 left-1/4 size-80 rounded-full bg-brand-600/40 blur-3xl" />
            <div className="absolute -right-20 -bottom-28 size-96 rounded-full bg-cyan-500/25 blur-3xl" />
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_3fr]">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-cyan-300 ring-1 ring-white/15">
                <TrendingUp className="size-7" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-cyan-300">At a glance</p>
                <h2 id="impact-title" className="text-xl leading-tight font-bold text-white sm:text-2xl">
                  Teravex Digital in Numbers
                </h2>
              </div>
            </div>
            <dl data-gsap-stagger className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
              {impactStats.map((stat, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center gap-2 px-2 text-center lg:border-l lg:border-white/10"
                  >
                    <Icon className="size-6 text-cyan-300" aria-hidden="true" />
                    <dt className="order-last text-sm text-white/70">{stat.label}</dt>
                    <dd className="text-3xl font-extrabold text-white sm:text-4xl">
                      <CountUp value={stat.value} />
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
