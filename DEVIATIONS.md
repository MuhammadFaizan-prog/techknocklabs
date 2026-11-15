# Deviations from the brief (logged, not silently cut)

1. **Mockup file missing.** `concept-1-door-ajar.png` does not exist anywhere in the workspace (searched `/workspace` recursively). The build was matched against the written Direction 1 spec and its image prompt in `work/design-inspo.md` instead, element by element (nav, two-line serif italic, door right, mono label, pill + underlined link, hairline stat row, numbered 02 list).
2. **Hero door is a generated still, not WebGL/video.** As requested; it upscales ~1.3× on a 900px-tall desktop hero, so it reads slightly soft on very large screens.
3. **Hero sentence.** Their rotating line ("We build the next generation of custom AI apps / SaaS products / …") is shown as one static sentence listing all five; the longer "From MVPs to enterprise platforms…" paragraph moved to the 02 chapter intro. No information dropped; the timed rotation was removed (motion budget: no timed text swaps).
4. **Testimonials cycle manually** (prev/next, live region) — no auto-rotate, per the motion rules.
5. **Contact details.** Their email is Cloudflare-obfuscated and their phone row literally reads "[+44 number] · [+1 number]" (placeholder on the live site). Neither is shown; the page points to the form and cal.com. The cal.com scheduler is a link, not an embedded iframe (no third-party script).
6. **Contact form never shows a fake "Sent".** Success state says the details passed validation and that nothing was sent (portfolio demo), per §29 "a form with no backend says so". Button label is "Send project details" (their site says "Submit", which §30 bans).
7. **"Explore" links** on their services list became "See {service}" (§30 bans "Explore").
8. **Location emojis** (🇬🇧 🇺🇸 🌍) replaced with text codes UK / US / Global (no emoji icons).
9. **"Connect on LinkedIn"** on About links to `https://www.linkedin.com/` exactly as their site does (it is a generic link there too).
10. **Dedicated engineers price differs by page on their site** ($35/hour on home, $3,500/month on /services). Both kept where they appear.
11. **Maker/checker:** no separate fresh-context reviewer agent was available in this run. Verification was done by scripted checks (build, lint, tsc, Playwright functional + SEO checks, screenshots) plus a self-review; treat visual taste as UNVERIFIED by an independent reviewer.
12. `next.config.ts`: removed the scaffold's turbopack rule for `@tailwindcss/turbopack` (package not installed; Tailwind runs via PostCSS). `dynamicParams` not used (incompatible with `cacheComponents`); unknown slugs 404 via `src/proxy.ts` instead.
