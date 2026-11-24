import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tone === "light"
          ? "bg-linear-to-r from-brand-100 to-cyan-100 text-brand-800 ring-1 ring-brand-200/60"
          : "bg-white/10 text-cyan-200 ring-1 ring-white/15",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
}

/**
 * Consistent heading block for every section.
 * Wrap the highlighted word(s) of `title` in <span className="text-gradient">.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading data-split className="text-3xl font-extrabold text-navy-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
        {title}
      </Heading>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
