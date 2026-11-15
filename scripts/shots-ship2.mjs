import { chromium } from "@playwright/test";
const BASE = process.env.BASE || "http://localhost:3100";
const OUT = process.env.OUT || "/tmp/shots";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(BASE + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(1600);
await p.screenshot({ path: `${OUT}/desktop-home-hero.png` });
async function at(sel, name, off = 0, after) {
  const y = await p.evaluate(([s, o]) => document.querySelector(s).getBoundingClientRect().top + scrollY + o, [sel, off]);
  const cur = await p.evaluate(() => scrollY);
  const steps = Math.max(1, Math.ceil(Math.abs(y - cur) / 500));
  for (let i = 1; i <= steps; i++) { await p.evaluate((yy) => window.scrollTo(0, yy), cur + ((y - cur) * i) / steps); await p.waitForTimeout(40); }
  await p.waitForTimeout(1600);
  const y2 = await p.evaluate(([s, o]) => document.querySelector(s).getBoundingClientRect().top + scrollY + o, [sel, off]);
  await p.evaluate((yy) => window.scrollTo(0, yy), y2);
  await p.waitForTimeout(900);
  if (after) await after();
  await p.screenshot({ path: `${OUT}/${name}.png` });
}
await at("ol.bento", "desktop-home-services", -110, async () => {
  const card = p.locator("ol.bento > li").nth(0); const bx = await card.boundingBox();
  await p.mouse.move(bx.x + bx.width * 0.55, bx.y + 4); await p.waitForTimeout(500);
});
await at(".cscroll-card", "desktop-home-work-showcase", -330);
await at("section:has(#ch-05) ol", "desktop-home-why", -110, async () => {
  const card = p.locator("#ch-05").locator("xpath=ancestor::section").locator("ol > li").nth(0); const bx = await card.boundingBox();
  await p.mouse.move(bx.x + bx.width * 0.8, bx.y + 20); await p.waitForTimeout(500);
});
await p.mouse.move(5, 5);
await at(".orbit", "desktop-home-orbit", -150);
{ const box = await p.locator(".orbit-core").boundingBox(); await p.mouse.move(box.x + box.width/2, box.y + box.height/2); await p.waitForTimeout(300); } await p.evaluate(() => document.querySelectorAll(".orbit-node")[2].focus()); await p.waitForTimeout(1300);
await p.screenshot({ path: `${OUT}/desktop-home-orbit-step3.png` });
await p.mouse.move(5, 5);
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(400);
for (let i = 0; i < 4; i++) { await p.mouse.wheel(0, 600); await p.waitForTimeout(80); }
await p.waitForTimeout(2000);
await p.screenshot({ path: `${OUT}/desktop-home-footer.png` });
await p.goto(BASE + "/blog", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
await p.screenshot({ path: `${OUT}/desktop-blog.png` });
await p.screenshot({ path: `${OUT}/desktop-blog-full.png`, fullPage: true });
const covers = await p.evaluate(() => [...document.querySelectorAll("main img")].map(i => i.currentSrc || i.src).filter(s => s.includes("blog")).length);
const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })).newPage();
await m.goto(BASE + "/", { waitUntil: "networkidle" }); await m.waitForTimeout(1500);
await m.screenshot({ path: `${OUT}/mobile-home-top.png` });
// reveal everything for the full-page shot
for (let y = 0; y < 30000; y += 700) { await m.evaluate(yy => scrollTo(0, yy), y); await m.waitForTimeout(60); }
await m.waitForTimeout(800);
await m.screenshot({ path: `${OUT}/mobile-home-full.png`, fullPage: true });
const ov = await m.evaluate(() => document.documentElement.scrollWidth);
console.log({ blogCoverImgs: covers, mobileScrollWidth: ov });
await b.close();
