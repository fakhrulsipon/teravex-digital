"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Animates the numeric part of a value (e.g. "24", "1,499", "13") from 0 when it
 * scrolls into view. The final value is rendered on the server, so the number
 * is always correct even without JavaScript.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
    if (!el || !inView || !match) return;
    const [, prefix, num, suffix] = match;
    const grouped = num.includes(",");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, Number(num.replace(/,/g, "")), {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const n = Math.round(v);
        el.textContent = `${prefix}${grouped ? n.toLocaleString("en-US") : n}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      // Never leave a partially-animated number on screen.
      el.textContent = value;
    };
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
