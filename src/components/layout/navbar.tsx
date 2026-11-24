"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { mainNav, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function ServicesMenu() {
  return (
    <div className="invisible absolute top-full left-1/2 z-50 w-[min(92vw,40rem)] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-3 shadow-lift">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services#${service.slug}`}
            className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50 focus-visible:bg-brand-50"
          >
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-lg bg-linear-to-br text-white shadow-sm",
                service.accent,
              )}
            >
              <service.icon className="size-4.5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-navy-950 group-hover/item:text-brand-700">
                {service.name}
              </span>
              <span className="line-clamp-1 text-xs text-muted-foreground">
                {service.subServices.map((s) => s.name).join(" · ")}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-300 sm:px-6",
          scrolled
            ? "border border-white/70 bg-white/85 shadow-soft backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const isServices = item.href === "/services";
              return (
                <li key={item.href} className={cn("relative", isServices && "group")}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active ? "text-brand-700" : "text-slate-600 hover:text-navy-950",
                    )}
                  >
                    {item.label}
                    {isServices ? (
                      <ChevronDown
                        className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                        aria-hidden="true"
                      />
                    ) : null}
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-brand-600 to-cyan-500"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </Link>
                  {isServices ? <ServicesMenu /> : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="navy" size="pill" className="hidden sm:inline-flex">
            <Link href="/contact">
              Get a Quote
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="soft"
                size="icon-lg"
                className="size-11 rounded-xl lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm gap-0 border-l-0 bg-white p-0">
              <SheetHeader className="border-b border-border px-5 py-4">
                <SheetTitle asChild>
                  <div>
                    <Logo />
                  </div>
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col gap-1">
                  {mainNav.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-semibold transition-colors",
                            active ? "bg-brand-50 text-brand-700" : "text-navy-950 hover:bg-muted",
                          )}
                        >
                          {item.label}
                          <ArrowRight className="size-4 opacity-40" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 px-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Services
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-1.5 px-1">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services#${service.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-muted"
                      >
                        <service.icon className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
                        <span className="leading-tight">{service.shortName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col gap-3 border-t border-border p-5">
                <Button asChild variant="brand" size="xl" className="w-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Get a Quote
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
