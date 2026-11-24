"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Client-side providers. Respects the user's reduced-motion OS setting. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
