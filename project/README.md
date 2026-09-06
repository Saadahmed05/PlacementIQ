# PlacementIQ — College Placement Analytics Portal

A premium, Apple-inspired placement analytics portal built with Next.js 15,
TypeScript, Tailwind CSS, Framer Motion, and Recharts — powered entirely by
your `Colleges_List_Final.xlsx` dataset.

## What's inside

- **Landing page** — hero, instant search, animated KPI stats, top colleges.
- **Colleges page** — every college from the Excel sheet, instant search,
  filters (placement %, avg/highest package, student strength, NIRF rank),
  sorting.
- **College detail pages** — one auto-generated page per college with every
  available metric, contact info, and source-verified research notes.
  Missing fields always show **"Data Not Available"** — nothing is invented.
- **Compare page** — pick any two colleges for a side-by-side metrics chart
  and a normalized radar profile.
- **Analytics page** — recreates the Power BI dashboard's KPIs and charts
  (ranked bar chart by metric, placement-vs-students-vs-package bubble
  chart, average-package treemap, NIRF-ranked table, and an elite
  IIT/Oxford/Cambridge benchmark chart) using Recharts.
- **Dark mode**, glassmorphism cards, gradient accents, and smooth
  Framer Motion animations throughout.

## Data pipeline

All application data lives in `data/data.json`, generated directly from
`Colleges_List_Final.xlsx` (sheets: `JNTUA Affliated Collages`,
`3 column list`, `Research Sources`, and the IIT/Oxford/Cambridge benchmark
sheet). Numeric fields (placement %, total students, NIRF rank, IIC rating,
startup count) are parsed out of the original free-text cells; the original
raw text is preserved alongside the parsed number so nothing is lost. Any
field that had no usable value is stored as `null` and rendered as
**"Data Not Available"** everywhere in the UI. No values were fabricated.

If your Excel file changes, re-run the extraction script (see
`scripts/build-data.py` if you'd like to regenerate — or ask your AI
assistant to re-parse an updated file into `data/data.json`, following the
same field mapping).

## Getting started locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables
   are required — all data is bundled at build time.
4. Deploy.

## Tech stack

- Next.js 15 (App Router)
- React 18 + TypeScript
- Tailwind CSS + `tailwindcss-animate`
- Framer Motion
- Recharts
- lucide-react icons
- next-themes (dark mode)

## Project structure

```
app/
  page.tsx                  Landing page
  colleges/page.tsx          Colleges listing (search + filters)
  colleges/[slug]/page.tsx   Dynamic college detail page
  compare/page.tsx           Compare two colleges
  analytics/page.tsx         Power BI-style analytics dashboard
  about/, contact/, privacy/ Footer pages
components/
  ui/                        Button, Card, Badge, Input, Select, Tabs
  navbar.tsx, footer.tsx, hero.tsx, college-card.tsx, stat-card.tsx
lib/
  data.ts                    Data access layer (reads data/data.json)
  types.ts                   Shared TypeScript types
  utils.ts                   cn(), formatters, "Data Not Available" helper
data/
  data.json                  Extracted & cleaned dataset (source of truth: Excel)
```
