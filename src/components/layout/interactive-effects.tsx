"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Site-wide pointer effects, driven by data attributes so server components can opt in:
 *  - `.spotlight`  → glow + border follow the cursor (CSS reads --mx / --my)
 *  - `data-tilt`   → card tilts in 3D toward the cursor
 * Mouse only; touch screens and "reduce motion" users get the static design.
 */
function usePointerEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const resetTilt = () => {
      if (tilted) tilted.style.transform = "";
      tilted = null;
    };
    const resetMagnet = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const spot = target?.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      // Magnetic buttons: drift a few pixels toward the cursor.
      const mag = target?.closest<HTMLElement>("[data-magnetic]");
      if (mag !== magnet) resetMagnet();
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.style.transition = "transform 0.2s ease-out";
        mag.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.28).toFixed(1)}px)`;
        magnet = mag;
      }

      const tilt = target?.closest<HTMLElement>("[data-tilt]");
      if (tilt !== tilted) resetTilt();
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transition = "transform 0.15s ease-out, translate 0.3s ease, box-shadow 0.3s ease";
        tilt.style.transform = `perspective(1000px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
        tilted = tilt;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      resetTilt();
      resetMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);
}

/** Thin gradient bar at the top of the page showing how far you've scrolled. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-brand-600 via-cyan-400 to-violet-500"
    />
  );
}

export function InteractiveEffects() {
  usePointerEffects();
  return <ScrollProgress />;
}
