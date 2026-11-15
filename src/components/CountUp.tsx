"use client";

import { useEffect, useRef, useState } from "react";

/** Counts a stat up when it enters view. The real value is rendered first
 *  (no-JS, SSR, reduced motion) and reserves the width so nothing shifts. */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] ?? "").length;
    const fmt = (n: number) => `${pre}${n.toFixed(decimals)}${post}`;
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setShown(fmt(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    // Start from zero only while off-screen or about to animate.
    raf = requestAnimationFrame(() => {
      setShown(fmt(0));
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="count">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="count-ghost">{value}</span>
      <span aria-hidden="true" className="count-live">{shown}</span>
    </span>
  );
}
