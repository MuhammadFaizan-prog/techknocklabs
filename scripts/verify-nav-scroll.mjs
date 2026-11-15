import { chromium } from "@playwright/test";
const BASE = process.env.BASE || "http://localhost:3100";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", e => errs.push(String(e)));
const results = [];
for (const label of ["Work", "Blog", "Services"]) {
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  // scroll to bottom with the wheel (goes through Lenis) then settle
  for (let i = 0; i < 60; i++) { await p.mouse.wheel(0, 2500); await p.waitForTimeout(40); }
  await p.waitForTimeout(1500);
  const before = await p.evaluate(() => scrollY);
  const nav = p.locator("header nav a", { hasText: new RegExp(`^${label}$`) }).first();
  await nav.click();
  await p.waitForURL(u => u.pathname !== "/", { timeout: 10000 });
  await p.waitForTimeout(120);
  const yAt = await p.evaluate(() => scrollY);
  const stat0 = await p.evaluate(() => {
    const els = [...document.querySelectorAll("main [data-reveal],main [data-split],main [data-stagger],main [data-wipe]")];
    const below = els.filter(e => e.getBoundingClientRect().top > innerHeight * 1.2);
    return { total: els.length, belowFold: below.length, belowRevealed: below.filter(e => e.classList.contains("is-in")).length };
  });
  await p.waitForTimeout(1200);
  const stat1 = await p.evaluate(() => {
    const els = [...document.querySelectorAll("main [data-reveal],main [data-split],main [data-stagger],main [data-wipe]")];
    const inView = els.filter(e => { const r = e.getBoundingClientRect(); return r.top < innerHeight * 0.9 && r.bottom > 0; });
    return { inView: inView.length, inViewRevealed: inView.filter(e => e.classList.contains("is-in")).length, y: scrollY };
  });
  // then scroll down a bit: below-fold reveals should fire now
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 400); await p.waitForTimeout(60); }
  await p.waitForTimeout(1200);
  const stat2 = await p.evaluate(() => document.querySelectorAll("main .is-in").length);
  results.push({ label, path: new URL(p.url()).pathname, scrolledFrom: before, scrollYAfterNav120ms: yAt, ...stat0, ...stat1, revealedAfterScrolling: stat2 });
}
// back/forward keeps position
await p.goto(BASE + "/", { waitUntil: "networkidle" });
for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 500); await p.waitForTimeout(60); }
await p.waitForTimeout(800);
const yHome = await p.evaluate(() => scrollY);
await p.locator("header nav a", { hasText: /^About$/ }).first().click();
await p.waitForURL(/about/); await p.waitForTimeout(500);
await p.goBack(); await p.waitForURL(u => u.pathname === "/"); await p.waitForTimeout(1200);
results.push({ backForward: { yHome, yAfterBack: await p.evaluate(() => scrollY) } });
console.log(JSON.stringify(results, null, 1)); console.log("pageerrors", errs);
await b.close();
