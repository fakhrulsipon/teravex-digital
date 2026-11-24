"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

/** True when the visitor asked the OS for less motion. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Splits every `[data-split]` heading inside `root` into masked lines that slide up
 * one after another when the heading scrolls into view.
 */
export function splitHeadings(root: Element) {
  root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = "1";
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          rotate: 2.5,
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play complete none none" },
        }),
    });
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
