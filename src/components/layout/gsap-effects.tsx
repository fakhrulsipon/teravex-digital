"use client";

import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Page-wide GSAP scroll effects, driven by data attributes so the markup stays simple:
 *
 * - `data-gsap-img`       image frame wipes open from the bottom while the photo settles from a zoom
 * - `data-gsap-zoom`      dark panel grows to full size as it scrolls into view (scrubbed)
 * - `data-gsap-parallax`  background image drifts slower than the page (scrubbed)
 * - `data-gsap-draw`      line draws itself from left to right (scrubbed)
 * - `data-gsap-stagger`   direct children rise in one after another
 * - `data-gsap-slide`     direct children glide in from the right
 * - `data-gsap-hero`      home hero: copy and visual drift apart as you scroll past
 *
 * Re-runs on every route change; `useGSAP` reverts the previous page's animations.
 */
export function GsapEffects() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set(q("[data-gsap-stagger] > *, [data-gsap-slide] > *"), { autoAlpha: 1 });
        return;
      }

      // Image frames: clip-path wipe + photo zoom-out
      q("[data-gsap-img]").forEach((frame) => {
        const img = frame.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 88%", toggleActions: "play complete none none" } });
        tl.fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0% round 1.75rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" },
        );
        if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "transform" }, 0.1);
      });

      // Dark panels expand into place
      q("[data-gsap-zoom]").forEach((panel) => {
        gsap.fromTo(
          panel,
          { scale: 0.9, borderRadius: "3.5rem" },
          {
            scale: 1,
            borderRadius: getComputedStyle(panel).borderRadius,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "top 55%", scrub: 0.8 },
          },
        );
      });

      // Slow background drift
      q("[data-gsap-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            scale: 1.18,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Self-drawing lines
      q("[data-gsap-draw]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "0% 50%" },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: line, start: "top 85%", end: "top 45%", scrub: 0.6 } },
        );
      });

      // Lists that rise in one by one
      q("[data-gsap-stagger]").forEach((list) => {
        gsap.fromTo(
          list.children,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.07,
            clearProps: "transform",
            scrollTrigger: { trigger: list, start: "top 92%", toggleActions: "play complete none none" },
          },
        );
      });

      // Screenshots gliding in from the side
      q("[data-gsap-slide]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, xPercent: 18 },
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: 1.5,
            stagger: 0.18,
            clearProps: "transform",
            scrollTrigger: { trigger: group, start: "top 85%", toggleActions: "play complete none none" },
          },
        );
      });

      // Home hero: copy rises and fades, visual sinks, as the visitor scrolls away
      const hero = document.querySelector<HTMLElement>("[data-gsap-hero]");
      if (hero) {
        const st = { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(hero.querySelector("[data-gsap-hero-copy]"), { yPercent: -18, autoAlpha: 0.15, ease: "none", scrollTrigger: st });
        gsap.to(hero.querySelector("[data-gsap-hero-visual]"), { yPercent: 12, scale: 0.94, ease: "none", scrollTrigger: st });
      }

      // Images and fonts change the page height after load
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });
      return () => window.removeEventListener("load", refresh);
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
