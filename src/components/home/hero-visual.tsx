import { Languages, MonitorSmartphone, ShieldCheck, Smartphone, Star } from "lucide-react";
import { HeroOrb } from "@/components/three/hero-orb";

/** Small text-free "skeleton" line used to suggest UI content inside mockups. */
function Line({ className }: { className: string }) {
  return <span className={`block rounded-full ${className}`} />;
}

function LaptopScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[0.45rem] bg-white">
      {/* Browser bar */}
      <div className="flex items-center gap-1 border-b border-slate-100 px-[3%] py-[1.6%]">
        <span className="size-[0.35rem] rounded-full bg-rose-400 sm:size-1.5" />
        <span className="size-[0.35rem] rounded-full bg-amber-400 sm:size-1.5" />
        <span className="size-[0.35rem] rounded-full bg-emerald-400 sm:size-1.5" />
        <span className="ml-[4%] h-[0.4rem] w-[38%] rounded-full bg-slate-100 sm:h-2" />
        <span className="ml-auto rounded-full bg-brand-50 px-[2%] text-[clamp(0.3rem,0.8vw,0.55rem)] font-bold text-brand-700">
          EN | ع
        </span>
      </div>
      {/* Website hero */}
      <div className="relative flex flex-1 flex-col">
        <div className="relative flex flex-[1.25] items-center overflow-hidden bg-linear-to-br from-navy-900 via-brand-800 to-brand-600 px-[6%]">
          <div className="absolute inset-y-0 right-0 w-[48%] bg-linear-to-l from-cyan-400/40 to-transparent" />
          <div className="absolute top-[12%] right-[8%] bottom-[12%] w-[34%] rounded-md bg-white/10 ring-1 ring-white/20">
            <div className="absolute inset-x-[12%] bottom-[14%] flex h-[55%] items-end gap-[8%]">
              {[40, 65, 50, 85, 70, 100].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm bg-cyan-300/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="relative z-10 flex w-[52%] flex-col gap-[0.4rem]">
            <p className="text-[clamp(0.45rem,1.6vw,0.95rem)] leading-tight font-extrabold text-white italic">
              Grow Your
              <br />
              Business Faster
            </p>
            <Line className="h-[0.3rem] w-[80%] bg-white/40" />
            <Line className="h-[0.3rem] w-[60%] bg-white/30" />
            <span className="mt-[2%] h-[0.7rem] w-[38%] rounded-full bg-linear-to-r from-brand-400 to-cyan-400 sm:h-3" />
          </div>
        </div>
        {/* Feature cards */}
        <div className="grid flex-1 grid-cols-3 gap-[3%] bg-slate-50 p-[4%]">
          {["bg-brand-100", "bg-cyan-100", "bg-indigo-100"].map((c, i) => (
            <div key={i} className="flex flex-col gap-[10%] rounded-md bg-white p-[8%] shadow-sm">
              <span className={`size-[0.8rem] rounded-sm sm:size-3.5 ${c}`} />
              <Line className="h-[0.25rem] w-[85%] bg-slate-200" />
              <Line className="h-[0.25rem] w-[60%] bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-white sm:rounded-[1.4rem]">
      <div className="mx-auto mt-[5%] h-[3%] w-[34%] rounded-full bg-navy-950" />
      <div className="mx-[7%] mt-[6%] flex flex-[1.1] flex-col justify-end gap-[6%] overflow-hidden rounded-xl bg-linear-to-br from-brand-700 to-cyan-500 p-[9%]">
        <p className="text-[clamp(0.35rem,1.05vw,0.62rem)] leading-tight font-extrabold text-white italic">
          Grow Your
          <br />
          Business Faster
        </p>
        <span className="h-[0.45rem] w-[50%] rounded-full bg-white/80 sm:h-2" />
      </div>
      <div className="flex flex-1 flex-col gap-[7%] px-[7%] py-[8%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-[8%] rounded-lg bg-slate-50 p-[6%]">
            <span className="size-[0.8rem] shrink-0 rounded-md bg-linear-to-br from-brand-400 to-cyan-300 sm:size-4" />
            <span className="flex flex-1 flex-col gap-[0.2rem]">
              <Line className="h-[0.22rem] w-full bg-slate-200" />
              <Line className="h-[0.22rem] w-[60%] bg-slate-100" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Decorative hero composition — laptop + phone mockup with floating cards.
 * Built entirely with CSS so it is crisp at any size and needs no image download.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[1.12] w-full max-w-[38rem]" aria-hidden="true">
      {/* Glow + live 3D orb, orbit rings and particles (three.js) */}
      <div className="absolute inset-[8%] rounded-full bg-linear-to-br from-cyan-300/50 via-brand-300/40 to-transparent blur-3xl" />
      <HeroOrb className="-inset-[24%]" />

      {/* Platform */}
      <div className="absolute inset-x-[6%] bottom-[4%] h-[16%] rounded-[50%] bg-linear-to-b from-white to-brand-100 shadow-[0_30px_60px_-20px_rgb(29_82_240/0.45)] ring-1 ring-white" />

      {/* Laptop */}
      <div className="absolute top-[20%] left-[6%] w-[74%]">
        <div className="rounded-t-[0.9rem] bg-navy-950 p-[2.2%] shadow-[0_30px_60px_-20px_rgb(5_15_41/0.55)] ring-1 ring-slate-700">
          <div className="aspect-[16/10]">
            <LaptopScreen />
          </div>
        </div>
        <div className="relative mx-[-7%] h-[0.75rem] rounded-b-[1rem] bg-linear-to-b from-slate-200 to-slate-400 sm:h-4">
          <span className="absolute top-0 left-1/2 h-[40%] w-[16%] -translate-x-1/2 rounded-b-md bg-slate-400/60" />
        </div>
      </div>

      {/* Phone */}
      <div className="absolute right-[6%] bottom-[10%] w-[25%] rotate-[4deg]">
        <div className="aspect-[9/19] rounded-[1.4rem] bg-navy-950 p-[5%] shadow-[0_30px_50px_-15px_rgb(5_15_41/0.6)] ring-1 ring-slate-600 sm:rounded-[1.7rem]">
          <PhoneScreen />
        </div>
      </div>

      {/* Floating stat cards */}
      <div className="animate-float absolute top-[2%] left-[0%] flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 px-3 py-2 shadow-lift backdrop-blur sm:px-4 sm:py-3">
        <span className="grid size-8 place-items-center rounded-xl bg-linear-to-br from-brand-600 to-cyan-500 text-white sm:size-10">
          <Languages className="size-4 sm:size-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-extrabold text-navy-950 sm:text-base">English & Arabic</span>
          <span className="block text-[0.65rem] text-muted-foreground sm:text-xs">Websites in both languages</span>
        </span>
      </div>

      <div className="animate-float absolute top-[33%] right-[-2%] hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/90 px-3 py-2.5 shadow-lift backdrop-blur [animation-delay:-3s] sm:flex">
        <span className="grid size-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
          <Smartphone className="size-4.5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold text-navy-950">Android & iOS</span>
          <span className="block text-xs text-muted-foreground">Apps for every phone</span>
        </span>
      </div>

      <div className="animate-float-slow absolute bottom-[16%] left-[-1%] rounded-2xl border border-white/80 bg-white/90 p-2.5 shadow-lift backdrop-blur [animation-delay:-5s] sm:p-3.5">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600 sm:size-8">
            <MonitorSmartphone className="size-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-xs font-bold text-navy-950 sm:text-sm">Phone-friendly</span>
            <span className="block text-[0.65rem] text-muted-foreground sm:text-xs">Looks great on any screen</span>
          </span>
        </div>
      </div>

      <div className="animate-float absolute right-[30%] bottom-[0%] hidden items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3.5 py-2 shadow-lift [animation-delay:-1.5s] sm:flex">
        <ShieldCheck className="size-4 text-brand-600" />
        <span className="text-xs font-semibold text-navy-950">Fast · Secure · Easy to use</span>
        <Star className="size-3.5 fill-amber-400 text-amber-400" />
      </div>
    </div>
  );
}
