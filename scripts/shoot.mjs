// Full-page screenshots for verification. Usage: node scripts/shoot.mjs [baseUrl]
import { chromium } from "@playwright/test";
import fs from "node:fs";

const base = process.argv[2] ?? "http://localhost:3100";
const out = new URL("../screenshots/", import.meta.url).pathname;
fs.mkdirSync(out, { recursive: true });

const shots = [
  ["/", 1440, "home-1440"],
  ["/", 390, "home-390"],
  ["/services/ai-agents", 1440, "services-ai-agents-1440"],
  ["/work", 1440, "work-1440"],
  ["/work/clone-caller", 1440, "work-clone-caller-1440"],
  ["/about", 1440, "about-1440"],
  ["/blog", 1440, "blog-1440"],
  ["/contact", 1440, "contact-1440"],
];
const only = process.env.ONLY?.split(",");

const browser = await chromium.launch();
const report = [];
for (const [path, w, name] of shots) {
  if (only && !only.includes(name)) continue;
  const page = await browser.newPage({ viewport: { width: w, height: w > 500 ? 900 : 844 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(base + path, { waitUntil: "networkidle" });
  // scroll through to trigger reveals + lazy images
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `${out}${name}.png`, fullPage: true });
  if (name === "home-1440" || name === "home-390") {
    await page.screenshot({ path: `${out}${name}-fold.png` });
  }
  report.push({ name, overflow, errors });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 1));
