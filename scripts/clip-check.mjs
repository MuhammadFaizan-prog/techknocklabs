// Finds content that pokes past the viewport edge but is hidden by html/body overflow-x: clip
// (scrollWidth looks fine, yet the content is cut). Scrolls each page so scroll-driven transforms are checked too.
// Usage: node scripts/clip-check.mjs [base] [pages comma-separated]
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3100";
const pages = (process.argv[3] ?? "/").split(",");
const b = await chromium.launch();
for (const w of [360, 390, 768, 1024, 1280, 1440]) for (const path of pages) {
const ctx = await b.newContext({ viewport: { width: w, height: 900 }, hasTouch: true, deviceScaleFactor: 1 });
const p = await ctx.newPage(); await p.goto(base + path, { waitUntil: "networkidle" });
const res = await p.evaluate(async () => { const out = new Set(); for (let y = 0; y < document.body.scrollHeight; y += 450) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100));
 for (const el of document.querySelectorAll("body *")) { const r = el.getBoundingClientRect(); if (!r.width || (r.right <= innerWidth + 1 && r.left >= -1)) continue; if (getComputedStyle(el).position === "fixed") continue;
  let clipped = false; for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { if (/(hidden|clip)/.test(getComputedStyle(a).overflowX)) { clipped = true; break; } } if (!clipped) out.add(el.tagName + "." + String(el.className).slice(0, 60) + " L" + Math.round(r.left) + " R" + Math.round(r.right)); } }
 return [...out]; });
console.log(w, path, res.length ? res.slice(0, 6) : "clean");
await ctx.close(); }
await b.close();
