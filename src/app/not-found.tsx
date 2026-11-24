import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowBackground } from "@/components/shared/background";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-28 pb-16">
      <GlowBackground />
      <div className="container-page flex flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-cyan-500 text-white shadow-glow">
          <Compass className="size-8" aria-hidden="true" />
        </span>
        <p className="text-gradient mt-6 text-7xl font-extrabold sm:text-8xl">404</p>
        <h1 className="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">Page not found</h1>
        <p className="mt-3 max-w-md text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="xl">
            <Link href="/">
              <ArrowLeft data-icon="inline-start" /> Back to Home
            </Link>
          </Button>
          <Button asChild variant="soft" size="xl">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
