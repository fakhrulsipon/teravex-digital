import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckList({
  items,
  className,
  tone = "brand",
  size = "sm",
}: {
  items: readonly string[];
  className?: string;
  tone?: "brand" | "light";
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("flex flex-col", size === "sm" ? "gap-2" : "gap-3", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex items-start gap-2.5", size === "sm" ? "text-sm" : "text-[0.95rem]")}>
          <span
            className={cn(
              "mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full",
              tone === "brand" ? "bg-brand-600 text-white" : "bg-white/15 text-cyan-200",
            )}
          >
            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className={tone === "brand" ? "text-slate-700" : "text-white/85"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
