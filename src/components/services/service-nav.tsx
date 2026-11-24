"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/** Sticky, horizontally scrollable category nav with scroll-spy highlighting. */
export function ServiceNav() {
  const [active, setActive] = useState<string>(services[0].slug);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(s.slug))
      .filter((el): el is HTMLElement => el !== null);

    // Active = the last section whose top has passed 40% of the viewport.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = sections[0]?.id ?? services[0].slug;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Keep the active chip visible inside the horizontal scroller on mobile.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!list || !chip) return;
    list.scrollTo({ left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[5.25rem] z-30">
      <nav aria-label="Service categories" className="container-page">
        <ul
          ref={listRef}
          className="mx-auto flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-white/80 bg-white/85 p-1.5 shadow-soft backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                data-slug={s.slug}
                aria-current={active === s.slug ? "true" : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold whitespace-nowrap transition-all",
                  active === s.slug
                    ? "bg-linear-to-r from-brand-700 to-brand-500 text-white shadow-glow"
                    : "text-slate-600 hover:bg-brand-50 hover:text-brand-700",
                )}
              >
                <s.icon className="size-4" aria-hidden="true" />
                {s.shortName}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
