"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion, ScrollTrigger, splitHeadings, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset the element animates from */
  y?: number;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Fades + slides content in (GSAP) once when it scrolls into view.
 * Any `[data-split]` heading inside also reveals line by line.
 * Starts hidden via the `.gsap-reveal` class (see globals.css; <noscript> shows it).
 */
export function Reveal({ children, className, delay = 0, y = 48, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      splitHeadings(el);
      gsap.fromTo(
        el,
        { autoAlpha: 0, y, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play complete none none" },
        },
      );
    },
    { scope: ref },
  );

  const Component = as as "div";
  return (
    <Component ref={ref} className={cn("gsap-reveal", className)}>
      {children}
    </Component>
  );
}

/** Parent whose <StaggerItem> children rise into view one after another (row by row). */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(":scope > .gsap-item"));
      if (prefersReducedMotion()) {
        gsap.set(items, { autoAlpha: 1 });
        return;
      }
      gsap.set(items, { autoAlpha: 0, y: 70, rotateX: -14, transformPerspective: 1000, transformOrigin: "50% 0%" });
      ScrollTrigger.batch(items, {
        start: "top 94%",
        // Already scrolled past (e.g. page reloaded further down): just show them.
        onLeave: (batch) => gsap.set(batch, { autoAlpha: 1, clearProps: "transform" }),
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.15,
            stagger: 0.1,
            clearProps: "transform",
          }),
      });
    },
    { scope: ref },
  );

  const Component = as as "div";
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Component = as;
  return <Component className={cn("gsap-item", className)}>{children}</Component>;
}
