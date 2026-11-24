import Image from "next/image";
import { MapPin } from "lucide-react";
import { Eyebrow } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { QatarGlobe } from "@/components/three/qatar-globe";
import { qatarPoints } from "@/data/content";
import dohaSunset from "@/assets/images/doha-sunset.jpg";

/** "Built for Qatar" — dark panel with the four local selling points and a live 3D globe centred on Doha. */
export function QatarSection() {
  return (
    <section aria-labelledby="qatar-title" className="px-3 py-16 sm:px-4 sm:py-24">
      <Reveal>
        <div data-gsap-zoom className="relative isolate mx-auto max-w-[84rem] overflow-hidden rounded-[2rem] bg-navy-950 shadow-lift">
          {/* Doha skyline, softly blended into the dark panel */}
          <Image
            src={dohaSunset}
            data-gsap-parallax
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1280px) 1340px, 100vw"
            className="-z-20 object-cover object-[50%_45%] opacity-30"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -top-32 left-1/4 size-[28rem] rounded-full bg-brand-600/30 blur-3xl" />
            <div className="absolute -right-24 -bottom-32 size-[30rem] rounded-full bg-cyan-500/20 blur-3xl" />
          </div>

          <div className="grid items-center lg:grid-cols-[1fr_1.05fr]">
            <div className="relative z-10 p-7 sm:p-12 lg:py-16 lg:pr-0">
              <Eyebrow tone="dark" className="w-fit">
                Made for Qatar
              </Eyebrow>
              <h2 id="qatar-title" data-split className="mt-4 text-3xl leading-tight font-extrabold text-white sm:text-5xl">
                Built for Businesses in <span className="text-amber-300">Qatar</span>
              </h2>
              <p className="mt-4 max-w-md text-base text-white/75 sm:text-lg">
                Local language, local payments, local habits — from day one.
              </p>

              <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
                {qatarPoints.map((point) => (
                  <StaggerItem key={point.title}>
                    <div className="group flex h-full items-start gap-3.5 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/10 hover:ring-cyan-300/30">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                        <point.icon className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-bold text-white">{point.title}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-white/60">{point.description}</span>
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="relative h-[22rem] sm:h-[30rem] lg:h-[38rem]">
              <QatarGlobe className="inset-0" />
              <div className="animate-float absolute top-[14%] right-[8%] flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md sm:right-[12%]">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-amber-400" />
                </span>
                <MapPin className="size-4 text-amber-300" aria-hidden="true" />
                Based in Doha, Qatar
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
