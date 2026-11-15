"use client";

import { useEffect } from "react";

const TARGETS = "[data-reveal],[data-split],[data-stagger],[data-wipe],[data-count]";

/** Adds `.is-in` to reveal targets as they enter the viewport and fires a
 *  `tk:in` event on them (count-ups listen for it).
 *  Content is visible without JS: hidden states only apply under `.js`.
 *  A MutationObserver picks up elements from client-side navigations and
 *  re-keyed nodes (e.g. a new testimonial). Also drives the magnetic pull on
 *  primary buttons (pointer: fine, motion allowed). */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("js");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            e.target.dispatchEvent(new Event("tk:in"));
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    const scan = () =>
      document.querySelectorAll<HTMLElement>(`:is(${TARGETS}):not(.is-in):not([data-observed])`).forEach((el) => {
        el.dataset.observed = "";
        io.observe(el);
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Magnetic primary buttons
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    let active: HTMLElement | null = null;
    const reset = () => {
      if (active) {
        active.style.removeProperty("--mx");
        active.style.removeProperty("--my");
        active = null;
      }
    };
    const onMove = (ev: PointerEvent) => {
      if (!motionOk.matches) return;
      const card = (ev.target as Element | null)?.closest?.<HTMLElement>(".spot");
      if (card) {
        const cr = card.getBoundingClientRect();
        card.style.setProperty("--px", `${(ev.clientX - cr.left).toFixed(0)}px`);
        card.style.setProperty("--py", `${(ev.clientY - cr.top).toFixed(0)}px`);
      }
      const btn = (ev.target as Element | null)?.closest?.<HTMLElement>(".knock") ?? null;
      if (btn !== active) reset();
      if (!btn) return;
      active = btn;
      const r = btn.getBoundingClientRect();
      const dx = (ev.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (ev.clientY - (r.top + r.height / 2)) / (r.height / 2);
      btn.style.setProperty("--mx", `${(dx * 6).toFixed(2)}px`);
      btn.style.setProperty("--my", `${(dy * 4).toFixed(2)}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", reset);

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", reset);
    };
  }, []);
  return null;
}
