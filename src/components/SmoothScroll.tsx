"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling, desktop pointer only, off under reduced motion.
 *  Native scroll position is kept, so CSS scroll timelines and sticky layouts work. */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    if (!mq.matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.12,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
