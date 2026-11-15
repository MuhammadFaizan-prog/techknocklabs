// Functional checks: form validation + success, query preselect, 404, reduced motion, keyboard focus.
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();
const results = [];
const ok = (name, pass, info = "") => results.push(`${pass ? "PASS" : "FAIL"} ${name}${info ? " — " + info : ""}`);

let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base + "/contact", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Send project details" }).click();
const alerts = await page.locator("[role=alert]").count();
ok("empty submit shows errors", alerts >= 6, `${alerts} alerts`);
const focused = await page.evaluate(() => document.activeElement?.getAttribute("data-field"));
ok("focus moves to first invalid field", focused === "name", String(focused));
await page.getByLabel("Name", { exact: true }).fill("Test Person");
await page.getByLabel("Work email").fill("bad-email");
await page.getByLabel("Work email").blur();
ok("invalid email message", await page.getByText("That email doesn't look complete").isVisible());
await page.getByLabel("Work email").fill("test@example.com");
await page.locator("form label.chip", { hasText: "Custom AI Applications" }).click();
await page.locator("form label.chip", { hasText: "$5K–20K" }).click();
await page.locator("form label.chip", { hasText: "Just exploring" }).click();
await page.getByLabel("Tell us about your project").fill("We need a customer portal with an AI assistant for support.");
await page.getByRole("button", { name: "Send project details" }).click();
const status = page.getByRole("status");
ok("success state shown", await status.isVisible());
ok("success is honest (nothing sent)", (await status.innerText()).includes("nothing was sent"));

await page.goto(base + "/contact?interest=ai-audit", { waitUntil: "networkidle" });
const checked = await page.locator('input[type=checkbox]:checked').count();
const msg = await page.getByLabel("Tell us about your project").inputValue();
ok("?interest=ai-audit preselects", checked === 1 && msg.includes("audit"), `${checked} checked, "${msg}"`);

const r404 = await page.goto(base + "/work/does-not-exist");
ok("unknown case slug returns 404", r404.status() === 404, String(r404.status()));
const r404b = await page.goto(base + "/nope");
ok("unknown route returns 404", r404b.status() === 404, String(r404b.status()));

// keyboard: first Tab focuses skip link
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
ok("first Tab = skip link", (await page.evaluate(() => document.activeElement?.textContent)).includes("Skip to content"));
// h1 count per page
for (const p of ["/", "/services", "/services/ai-agents", "/work", "/work/clone-caller", "/about", "/blog", "/blog/rag-explained", "/contact"]) {
  await page.goto(base + p, { waitUntil: "domcontentloaded" });
  const h1 = await page.locator("h1").count();
  const title = await page.title();
  const desc = await page.locator('meta[name="description"]').getAttribute("content");
  const canon = await page.locator('link[rel="canonical"]').getAttribute("href");
  const imgsNoAlt = await page.locator("img:not([alt])").count();
  ok(`seo ${p}`, h1 === 1 && !!desc && !!canon && imgsNoAlt === 0, `h1=${h1} title(${title.length})="${title}" desc=${desc?.length} canon=${canon}`);
}
await page.close();

// reduced motion: door mask fully open, reveals visible
const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
page = await ctx.newPage();
await page.goto(base + "/", { waitUntil: "networkidle" });
const clip = await page.evaluate(() => getComputedStyle(document.querySelector(".door-mask")).clipPath);
const op = await page.evaluate(() => getComputedStyle(document.querySelector("[data-reveal]")).opacity);
ok("reduced motion: door fully open + content visible", (clip === "inset(0px)" || clip === "none" || clip.startsWith("inset(0")) && op === "1", `clip=${clip} opacity=${op}`);
await ctx.close();

// no-JS: content visible
const nojs = await browser.newContext({ javaScriptEnabled: false });
page = await nojs.newPage();
await page.goto(base + "/");
const op2 = await page.evaluate(() => getComputedStyle(document.querySelector("[data-reveal]")).opacity);
ok("no-JS: revealed content visible", op2 === "1", `opacity=${op2}`);
await nojs.close();

await browser.close();
console.log(results.join("\n"));
