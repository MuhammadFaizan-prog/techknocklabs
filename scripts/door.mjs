// Viewport frames through the door-mask scroll scene on the home page.
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3100";
const out = new URL("../screenshots/", import.meta.url).pathname;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base + "/", { waitUntil: "networkidle" });
const top = await page.evaluate(() => document.querySelector(".door-stage").getBoundingClientRect().top + scrollY);
for (const [i, f] of [0, 0.25, 0.5, 0.75].entries()) {
  const stageH = await page.evaluate(() => document.querySelector(".door-stage").offsetHeight - innerHeight);
  await page.evaluate((y) => window.scrollTo(0, y), top + stageH * f);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}door-scene-${i}.png` });
}
// stacked cards mid-scroll
const st = await page.evaluate(() => document.querySelector(".door-stage").nextElementSibling.getBoundingClientRect().top + scrollY);
await page.evaluate((y) => window.scrollTo(0, y + 900), st);
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}stack-scene.png` });
await browser.close();
console.log("ok");
