"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Lenis smooth scrolling, desktop pointer only, off under reduced motion.
 *  Native scroll position is kept, so CSS scroll timelines and sticky layouts work.
 *
 *  Route changes: a link click jumps to the top instantly (no smooth glide back
 *  through the old page, which used to replay its reveals). Back/forward keeps
 *  the position the browser restores. */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const popRef = useRef(false);
  const firstRef = useRef(true);

  useEffect(() => {
    const onPop = () => {
      popRef.current = true;
    };
    window.addEventListener("popstate", onPop);

    const mq = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    let lenis: Lenis | null = null;
    if (mq.matches) {
      lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        lerp: 0.12,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      lenisRef.current = lenis;
    }
    return () => {
      window.removeEventListener("popstate", onPop);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useIsoLayoutEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    if (popRef.current) {
      // Back/forward: let the browser restore, just resync Lenis to it.
      popRef.current = false;
      requestAnimationFrame(() => lenisRef.current?.resize());
      return;
    }
    if (window.location.hash) return; // in-page anchor targets handle themselves
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
    }
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
    window.dispatchEvent(new Event("tk:route"));
  }, [pathname]);

  return null;
}
