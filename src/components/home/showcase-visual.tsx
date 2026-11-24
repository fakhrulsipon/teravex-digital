import type { ShowcaseItem } from "@/data/content";

const bar = "block rounded-full";

/** Mini, text-free UI illustrations for each type of showcase project. */
export function ShowcaseVisual({ type }: { type: ShowcaseItem["visual"] }) {
  switch (type) {
    case "business":
      return (
        <Frame bg="from-brand-700 via-brand-600 to-sky-500">
          <Browser>
            <div className="flex h-[45%] items-center gap-3 bg-linear-to-r from-navy-900 to-brand-700 px-4">
              <div className="flex flex-1 flex-col gap-1.5">
                <span className={`${bar} h-2 w-3/4 bg-white/80`} />
                <span className={`${bar} h-1.5 w-1/2 bg-white/40`} />
                <span className="mt-1 h-3 w-14 rounded-full bg-cyan-400" />
              </div>
              <div className="h-[70%] w-[35%] rounded-md bg-white/15 ring-1 ring-white/20" />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2 p-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1.5 rounded-md bg-slate-50 p-2">
                  <span className="size-3 rounded bg-brand-200" />
                  <span className={`${bar} h-1 w-full bg-slate-200`} />
                  <span className={`${bar} h-1 w-2/3 bg-slate-200`} />
                </div>
              ))}
            </div>
          </Browser>
        </Frame>
      );
    case "ecommerce":
      return (
        <Frame bg="from-sky-500 via-brand-600 to-indigo-700">
          <Browser>
            <div className="grid flex-1 grid-cols-3 gap-2 p-3">
              {["bg-rose-100", "bg-amber-100", "bg-cyan-100", "bg-indigo-100", "bg-emerald-100", "bg-brand-100"].map(
                (c, i) => (
                  <div key={i} className="flex flex-col gap-1 rounded-md bg-white p-1.5 shadow-sm ring-1 ring-slate-100">
                    <span className={`aspect-square w-full rounded ${c}`} />
                    <span className={`${bar} h-1 w-3/4 bg-slate-200`} />
                    <span className="flex items-center justify-between">
                      <span className={`${bar} h-1.5 w-1/3 bg-brand-300`} />
                      <span className="size-2.5 rounded-sm bg-brand-600" />
                    </span>
                  </div>
                ),
              )}
            </div>
          </Browser>
        </Frame>
      );
    case "landing":
      return (
        <Frame bg="from-cyan-500 via-sky-500 to-brand-600">
          <Browser>
            <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-linear-to-b from-brand-50 to-white p-4">
              <span className={`${bar} h-2.5 w-2/3 bg-navy-900/80`} />
              <span className={`${bar} h-1.5 w-1/2 bg-slate-300`} />
              <div className="mt-2 flex gap-2">
                <span className="h-4 w-16 rounded-full bg-linear-to-r from-brand-600 to-cyan-500" />
                <span className="h-4 w-12 rounded-full bg-white ring-1 ring-slate-200" />
              </div>
              <div className="mt-3 flex w-3/4 gap-1.5 rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-100">
                <span className="h-3 flex-1 rounded bg-slate-100" />
                <span className="h-3 w-10 rounded bg-brand-600" />
              </div>
            </div>
          </Browser>
        </Frame>
      );
    case "app":
      return (
        <Frame bg="from-indigo-600 via-violet-500 to-brand-500">
          <div className="flex h-full items-end justify-center gap-3 pt-6">
            {[0, 1].map((p) => (
              <div
                key={p}
                className={`h-[88%] w-[30%] rounded-t-2xl bg-navy-950 p-1.5 pb-0 shadow-xl ${p === 1 ? "translate-y-3" : ""}`}
              >
                <div className="flex h-full flex-col gap-1.5 rounded-t-xl bg-white p-2">
                  <span className="mx-auto h-1 w-6 rounded-full bg-slate-800" />
                  <span className="h-8 rounded-md bg-linear-to-br from-indigo-400 to-cyan-300" />
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span className="size-3 shrink-0 rounded bg-indigo-100" />
                      <span className={`${bar} h-1 flex-1 bg-slate-200`} />
                    </span>
                  ))}
                  <span className="mt-auto mb-2 h-3 rounded-full bg-indigo-600" />
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case "ads":
      return (
        <Frame bg="from-blue-600 via-indigo-500 to-pink-500">
          <div className="flex h-full items-center justify-center gap-3 p-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex w-[28%] flex-col gap-1.5 rounded-xl bg-white p-2 shadow-xl ${i === 1 ? "-translate-y-2 scale-110" : "opacity-90"}`}
              >
                <span className="flex items-center gap-1">
                  <span className="size-3 rounded-full bg-linear-to-br from-pink-400 to-amber-300" />
                  <span className={`${bar} h-1 w-1/2 bg-slate-200`} />
                </span>
                <span className="aspect-[4/5] rounded-md bg-linear-to-br from-brand-200 via-indigo-200 to-pink-200" />
                <span className="h-2.5 rounded bg-brand-600" />
              </div>
            ))}
          </div>
        </Frame>
      );
    case "analytics":
      return (
        <Frame bg="from-emerald-500 via-teal-500 to-brand-600">
          <Browser>
            <div className="grid flex-1 grid-cols-3 gap-2 p-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1 rounded-md bg-slate-50 p-1.5">
                  <span className={`${bar} h-1 w-1/2 bg-slate-300`} />
                  <span className={`${bar} h-2 w-3/4 bg-navy-900/70`} />
                </div>
              ))}
              <div className="col-span-2 flex items-end gap-1 rounded-md bg-slate-50 p-2">
                {[35, 55, 40, 70, 60, 85, 95].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-sm bg-linear-to-t from-teal-500 to-cyan-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="grid place-items-center rounded-md bg-slate-50">
                <span className="size-10 rounded-full bg-[conic-gradient(#14b8a6_0_62%,#3371fb_62%_85%,#e2e8f0_85%)] [mask:radial-gradient(circle,transparent_42%,black_43%)]" />
              </div>
            </div>
          </Browser>
        </Frame>
      );
  }
}

function Frame({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden bg-linear-to-br ${bg}`} aria-hidden="true">
      <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.18)_1px,transparent_1px)] bg-size-[14px_14px]" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-[8%] top-[12%] bottom-0 flex flex-col overflow-hidden rounded-t-xl bg-white shadow-2xl transition-transform duration-500 group-hover:-translate-y-1.5">
      <div className="flex items-center gap-1 border-b border-slate-100 px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-rose-400" />
        <span className="size-1.5 rounded-full bg-amber-400" />
        <span className="size-1.5 rounded-full bg-emerald-400" />
      </div>
      {children}
    </div>
  );
}
