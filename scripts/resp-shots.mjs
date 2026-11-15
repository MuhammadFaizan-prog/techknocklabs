// Screenshots + grid geometry for the responsive pass. Usage: node scripts/resp-shots.mjs [base] [outDir]
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? "screenshots";
const browser = await chromium.launch();
const settle = async (page) => {
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
  await page.waitForTimeout(600);
};
const grid = (page, sel) => page.evaluate((sel) => {
  const items = [...document.querySelectorAll(sel + " > li")].map(li => li.getBoundingClientRect());
  const rows = {}; for (const b of items) { const k = Math.round(b.top); (rows[k] ||= []).push(`${Math.round(b.width)}x${Math.round(b.height)}`); }
  return Object.values(rows).map(r => r.join(" | ")).join("  //  ");
}, sel);
for (const w of [360, 390, 768, 1024]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, hasTouch: true, isMobile: w < 768, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  if (w === 390) { await page.waitForTimeout(1200); await page.screenshot({ path: `${out}/resp-hero-390.png` }); }
  await settle(page);
  console.log(`${w} services bento rows: ${await grid(page, "ol.bento")}`);
  console.log(`${w} why grid rows:      ${await grid(page, "section[aria-labelledby=ch-05] ol")}`);
  if (w === 390 || w === 768) {
    await page.locator("ol.bento").screenshot({ path: `${out}/resp-services-${w}.png` });
    await page.locator("section[aria-labelledby=ch-05]").screenshot({ path: `${out}/resp-why-${w}.png` });
  }
  if (w === 768 || w === 1024) { await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400); await page.screenshot({ path: `${out}/resp-home-${w}.png`, fullPage: true }); }
  await ctx.close();
}
await browser.close();
