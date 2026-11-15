"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Motion footer: GSAP ScrollTrigger curtain reveal + giant masked type.
 *  In-house re-build inspired by "Motion Footer" by @jahed on 21st.dev
 *  (see DEVIATIONS.md #17). GSAP is lazy-loaded only after the footer is near
 *  the viewport, and never under reduced motion. */
export function FooterFx() {
  const pathname = usePathname();
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("[data-mfooter]");
    if (!footer) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    let cleanup = () => {};
    let cancelled = false;
    const start = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const inner = footer.querySelector("[data-mf-inner]");
        const type = footer.querySelector("[data-mf-type]");
        const aurora = footer.querySelector("[data-mf-aurora]");
        if (inner)
          gsap.fromTo(
            inner,
            { yPercent: -18, opacity: 0.35 },
            { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: footer, start: "top bottom", end: "top 25%", scrub: 0.6 } }
          );
        if (type)
          gsap.fromTo(
            type,
            { yPercent: 55, clipPath: "inset(0% 0% 100% 0%)" },
            { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: type, start: "top bottom", end: "bottom bottom", scrub: 0.8 } }
          );
        if (aurora)
          gsap.fromTo(aurora, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, ease: "none", scrollTrigger: { trigger: footer, start: "top 90%", end: "bottom bottom", scrub: 1 } });
      }, footer);
      // page heights change across routes and after images load
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 600);
      cleanup = () => {
        window.clearTimeout(t);
        window.removeEventListener("load", refresh);
        ctx.revert();
      };
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "1200px 0px" }
    );
    io.observe(footer);
    return () => {
      cancelled = true;
      io.disconnect();
      cleanup();
    };
  }, [pathname]);
  return null;
}
