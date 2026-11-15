# Techknock Labs

Unofficial redesign of techknocklabs.com ("The Door Ajar"), using their official copy and images verbatim. Not affiliated; nothing is sent anywhere.

```bash
npm install
npm run build && npm start      # http://localhost:3000
npm run lint
# verification (server on :3100): npx next start -p 3100
node scripts/shoot.mjs           # full-page screenshots → screenshots/
node scripts/check.mjs           # form, 404, SEO, reduced-motion, no-JS checks
node scripts/door.mjs            # frames through the door-mask scroll scene
```

Docs: PLAN.md (direction contract), Tracker.md, DEVIATIONS.md, docs/VISUAL-BRIEF.md, docs/IMAGE-PROMPT-LOG.md.
