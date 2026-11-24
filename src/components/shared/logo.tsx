import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import tvxMark from "@/assets/brand/tvx-mark.png";
import tvxMarkWhite from "@/assets/brand/tvx-mark-white.png";

/** The TVX brand mark (transparent PNG). */
export function LogoMark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Image
      src={light ? tvxMarkWhite : tvxMark}
      alt=""
      aria-hidden="true"
      sizes="96px"
      className={cn("h-8 w-auto", className)}
    />
  );
}

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Teravex Digital — home"
      className={cn("inline-flex items-center gap-2.5 rounded-lg outline-offset-4", className)}
    >
      <LogoMark light={light} />
      <span
        className={cn(
          "font-heading text-[1.3rem] leading-none font-extrabold tracking-tight whitespace-nowrap",
          light ? "text-white" : "text-navy-950",
        )}
      >
        Teravex <span className={light ? "text-cyan-300" : "text-brand-600"}>Digital</span>
      </span>
    </Link>
  );
}
