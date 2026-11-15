// Responsive audit: horizontal overflow, small tap targets, overlapping hero rotator, per page per width.
// Usage: node scripts/responsive-check.mjs [baseUrl] [--shots dir]
import { chromium } from "@playwright/test";
const base = process.argv[2]?.startsWith("http") ? process.argv[2] : "http://localhost:3100";
const pages = ["/", "/services", "/work", "/work/clone-caller", "/about", "/blog", "/blog/ai-agents-vs-automation", "/contact", "/this-page-does-not-exist"];
const widths = [360, 390, 768, 1024, 1280, 1440];
const browser = await chromium.launch();
const rows = [];
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, hasTouch: w <= 1024, isMobile: w < 768 });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" }).catch(() => {});
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const sw = document.documentElement.scrollWidth, iw = window.innerWidth;
      const offenders = [];
      if (sw > iw) for (const el of document.querySelectorAll("body *")) {
        const b = el.getBoundingClientRect();
        if (b.width && b.right > iw + 1 && getComputedStyle(el).position !== "fixed") {
          let clipped = false; for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a); if (/(hidden|clip)/.test(o.overflowX)) { clipped = true; break; } }
          if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}(${Math.round(b.right)})`);
        }
      }
      const small = [];
      for (const el of document.querySelectorAll("a[href], button, input:not([type=hidden]):not(.chip-input), select, textarea, [role=button]")) {
        const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        if (!b.width || cs.visibility === "hidden" || el.closest("[aria-hidden=true]") || el.classList.contains("sr-only") || cs.position === "absolute" && b.width < 2) continue;
        // inline text links inside paragraphs are exempt (WCAG 2.5.8 inline exception)
        if (cs.display === "inline" && el.closest("p, li p, dd")) continue;
        // card-cover links (::after absolute inset-0) are as big as their card
        const pa = getComputedStyle(el, "::after"); if (pa.content !== "none" && pa.position === "absolute") continue;
        // on touch, count the ::before hit-area expansion used by text links
        let hb = b.height, hwid = b.width;
        if (matchMedia("(pointer: coarse)").matches) { const pb = getComputedStyle(el, "::before"); if (pb.content !== "none" && pb.position === "absolute") { hb -= 2 * parseFloat(pb.top); hwid -= 2 * parseFloat(pb.left); } }
        if (!matchMedia("(pointer: coarse)").matches) { if (hb < 24 && hwid < 24) small.push(`${el.tagName.toLowerCase()}"${(el.textContent || "").trim().slice(0, 24)}"(${Math.round(hwid)}x${Math.round(hb)})`); continue; }
        if (hb < 44) small.push(`${el.tagName.toLowerCase()}"${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 24)}"(${Math.round(hwid)}x${Math.round(hb)})`);
      }
      let rot = "";
      const rt = document.querySelector(".rotator");
      if (rt) { const b = rt.getBoundingClientRect(); const lh = parseFloat(getComputedStyle(rt).height); rot = `rot ${Math.round(b.width)}x${Math.round(b.height)}`; }
      return { sw, iw, offenders: offenders.slice(0, 4), small: small.slice(0, 6), rot };
    });
    rows.push({ w, p, overflow: r.sw > r.iw ? `+${r.sw - r.iw}px` : "ok", ...r });
  }
  await ctx.close();
}
await browser.close();
console.log("width | page | overflow | small tap targets | notes");
for (const r of rows) console.log(`${r.w} | ${r.p} | ${r.overflow} | ${r.small.length ? r.small.join(", ") : "-"} | ${r.offenders.join(" ")} ${r.rot}`);
const bad = rows.filter(r => r.overflow !== "ok");
console.log(bad.length ? `\n${bad.length} page/width combos overflow` : "\nNo horizontal overflow at any width.");
