# Nexora Web — Digital Agency Website

Frontend-only, 5-page marketing site for **Nexora** (Website, App & Digital Marketing Agency).

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui · Lucide React · Framer Motion

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes prerendered as static)
npm run start
npm run lint
```

## Pages

`/` Home · `/services` · `/pricing` · `/about` · `/contact`

## Where content lives

All business content is in `src/data/` and is kept separate from the UI:

| File | Content |
|---|---|
| `site.ts` | Brand, nav, contact details & social links (**placeholders, so replace them**) |
| `services.ts` | 8 service categories → 3 sub-services → 5 features (from the agency PDF) |
| `pricing.ts` | Prices from the agency PDF, shown in USD ($) |
| `team.ts` | Team, CEO roles, managed services, 13-step project workflow |
| `content.ts` | Verified stats, FAQ, portfolio concepts, testimonials (empty until real reviews exist) |

See **`blog.md`** (Bangla) for the full summary and pre-launch checklist. Note that the contact form is UI and validation only and must be connected to a form service before going live.
