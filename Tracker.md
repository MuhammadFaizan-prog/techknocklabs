# Tracker

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | Content: re-fetch every page, diff vs 2026-11-12 scrape | Done | 7 live pages diffed: 0 text changes; sitemap 44 URLs (13 work, 18 blog) |
| 2 | Own images into `public/` (portfolio, clients, logo, office) | Done | 12 portfolio + 1 mobile, 8 logos, logo mark, office photo |
| 3 | Door images (hero ajar + CTA open) via structured prompts | Done | docs/VISUAL-BRIEF.md, docs/IMAGE-PROMPT-LOG.md |
| 4 | Tokens, fonts, nav, footer, chapter system | Done | src/app/globals.css, layout.tsx, components/ |
| 5 | Home: 12 chapters incl. door-mask reveal, stacked cases, knock rings | Done | screenshots/home-1440.png, door-scene-*.png |
| 6 | Services index + 5 detail pages | Done | screenshots/services-ai-agents-1440.png |
| 7 | Work index + 13 case pages | Done | screenshots/work-1440.png, work-clone-caller-1440.png |
| 8 | About (CEO named, team as roles only) | Done | screenshots/about-1440.png |
| 9 | Blog index + 18 posts (their HTML, scripts stripped) | Done | screenshots/blog-1440.png |
| 10 | Contact: UI-only form, validation, honest success state | Done | scripts/check.mjs (6 form checks pass) |
| 11 | SEO: title/description/canonical per page, OG, JSON-LD, sitemap, robots, real 404s | Done | check.mjs SEO rows + curl 404s |
| 12 | `npm run build` / `npm run lint` / `tsc` | Done | 0 errors, 0 warnings |
| 13 | Screenshots 1440 + 390, overflow + console checks | Done | overflow 0 px, 0 console errors on all 8 shots |
| 14 | Local git commit (no push) | Done | see `git log` |

Open / not done: see DEVIATIONS.md.
