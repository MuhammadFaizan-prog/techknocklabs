# PLAN — Techknock Labs redesign ("The Door Ajar")

Portfolio redesign of https://www.techknocklabs.com/ for Faizi. **Inspired adaptation of the client's own content** (their copy, numbers, images); no contact with Techknock, no form sends, no deploy, no push.

Mode: existing repo (Next.js 16.4.6 + React 19.3 + Tailwind v4 scaffold). Deps unchanged: next / react / react-dom / tailwind; `@playwright/test` (dev) only for screenshots + checks.

## Direction contract (dev-only)
- **Thesis:** a quiet dark room with one door opening onto warm light — senior, calm, expensive. The brand line "Tech knocks at your door." is made literal once, then the site gets out of the way.
- **Refuses:** the stock agency skeleton of centered hero + icon-card grids + gradient orbs + fake "AI agent running" terminal.
- **Palette (pinned):** night `#0A0A0A` · surface `#141414` · hairline `#2B2925` · muted `#8E8B85` · bone `#EDEAE3` · amber `#F2A65A` (light only: door slit, knock rings, focus ring, 7px dots, quote marks — never a fill).
- **Type roles:** Instrument Serif (display; italic only for "at your door." and the contact/404 echoes) · Geist (UI, headings, body) · Geist Mono (chapter numbers, labels). All OFL via `next/font/google`.
- **Layout sentence:** a 12-column editorial grid; every section is a numbered chapter whose label lives in cols 1–3 and whose content lives in cols 4–12, separated by hairlines.
```
┌ nav: wordmark ───── Services Work About Blog Contact ───── (Book a call) ┐
│ 01 — Software development · AI solutions          ┌──── door ajar ────┐ │
│ Tech knocks                                        │   ▌ amber slit     │ │
│ at your          (serif italic, huge)              │  ╱ light on floor  │ │
│ door.                                              └────────────────────┘ │
│ [Book a free strategy call]  See our work                                  │
│ ─ 138+ projects delivered │ 5.0 on Clutch │ Reply within 1 working day ─  │
├ logos ─────────────────────────────────────────────────────────────────────┤
│ 02 — What we do   | 01 AI Agents & Automation ............. 42+ │ (hover: copy)
│ 03 — Case studies | door-mask opens into Clone Caller → stacked sticky cases
│ 04 numbers · 05 why · 06 process (4 cols) · 07 engagement · 08 one quote
│ 09 resources · 10 FAQ · 11 blog · 12 CTA: the door fully open             │
└────────────────────────────────────────────────────────────────────────────┘
```
- **Motion thesis:** three layers only — (1) hero entrance once on load, (2) one authored moment: the door-shaped `clip-path` mask that opens from a 2%-wide slit into the full-bleed Clone Caller case (CSS scroll-driven animation, no JS, no scroll listeners), (3) hover/press layer: three amber "knock" rings off the primary CTA, underline draws, photo 1.03 zoom. Chapter headers fade/rise once via IntersectionObserver. All have `prefers-reduced-motion` end states; content is visible without JS.
- **Signature:** the door — ajar in the hero, a slit that becomes a case study, fully open at the close.

## Brief-pinned exceptions to the master prompt's "AI tells" list (§29)
The user chose this concept and asked for it exactly, so these are used on purpose: numbered chapter labels with mono type, editorial hairlines + italic serif + mono labels, a three-stat hairline row under the hero, one italic line in the H1, middle-dot meta in the hero label. Everything else on the banned list is avoided (no purple, glow blobs, glass, icon-card grids, emoji icons, auto carousels, invented metrics).

## Routes
`/`, `/services`, `/services/[slug]` (5), `/work`, `/work/[slug]` (13), `/about`, `/blog`, `/blog/[slug]` (18), `/contact`, `not-found`, `sitemap.xml`, `robots.txt`. Unknown slugs return a real 404 via `src/proxy.ts`.

## Content source
`src/content/{services,work,blog}.json` were parsed from their live pages (scraped 2026-11-12, re-fetched and diffed 2026-11-15 — identical). Home/about/contact/services copy is in `src/content/site.ts`, verbatim. Images are their own (`/portfolio`, `/clients`, `/img/logo-mark-blue.png`, `/people/office.jpg`) plus two generated door images (see docs/IMAGE-PROMPT-LOG.md).

## Budgets
LCP ≤ 2.5 s (hero webp 32 KB), CLS ≤ 0.1, no scroll listeners, ≤ 4 font families/files per role, WCAG 2.2 AA (muted text 5.8:1, bone 16.5:1, amber focus ring 9.8:1).
