import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { GlowBackground, DotPattern } from "./background";
import { Eyebrow } from "./section-heading";
import { Reveal } from "./reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  breadcrumb: string;
  children?: ReactNode;
}

/** Hero banner shared by all inner pages (Services, About, Contact). */
export function PageHero({ eyebrow, title, description, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-40 sm:pb-20">
      <GlowBackground />
      <DotPattern className="top-36 left-4 hidden md:block" />
      <DotPattern className="right-6 bottom-10 hidden md:block" />
      <div className="container-page flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center gap-5">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-brand-800">
                {breadcrumb}
              </li>
            </ol>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 data-split className="max-w-4xl text-4xl leading-[1.08] font-extrabold text-navy-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
        </Reveal>
        {children ? <Reveal delay={0.15} className="mt-8 w-full">{children}</Reveal> : null}
      </div>
    </section>
  );
}
