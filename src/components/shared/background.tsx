import { cn } from "@/lib/utils";

/** Soft blue/cyan glow blobs used behind hero areas. Purely decorative. */
export function GlowBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-cyan-300/30 blur-3xl sm:size-[44rem]" />
      <div className="absolute top-32 -left-48 size-[28rem] rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute right-1/3 -bottom-40 size-[24rem] rounded-full bg-sky-300/25 blur-3xl" />
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}

export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("bg-dots pointer-events-none absolute h-28 w-20 opacity-60", className)}
    />
  );
}
