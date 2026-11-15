"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, FileText, Hammer, Rocket } from "lucide-react";
import { processSteps } from "@/content/site";

/** Radial orbital timeline for "How we work".
 *  In-house re-build inspired by "Radial Orbital Timeline" by @jatin-yadav05
 *  on 21st.dev (see DEVIATIONS.md #17). Official step names/text only.
 *  Nodes orbit an amber core; click or focus a node to bring it to the top and
 *  read its official description. Slow auto-rotation pauses on interaction,
 *  hover, or when off-screen; none at all under reduced motion. */
const ICONS = [Search, FileText, Hammer, Rocket];
const EASE = (t: number) => 1 - Math.pow(1 - t, 4); // ~ cubic-bezier(0.16,1,0.3,1)
const SPEED = 0.006; // degrees per ms -> one turn every ~60s

export function ProcessOrbit() {
  const n = processSteps.length;
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const angle = useRef(-90); // base angle of node 0, degrees
  const anim = useRef<{ from: number; to: number; t0: number } | null>(null);
  const paused = useRef(false);
  const visible = useRef(false);
  const reduced = useRef(false);

  const paint = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const r = ring.clientWidth / 2;
    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      const a = ((angle.current + (360 / n) * i) * Math.PI) / 180;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      // depth cue: nodes nearer the top read brighter
      const depth = 0.55 + 0.45 * ((1 - Math.sin(a)) / 2);
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      el.style.setProperty("--depth", depth.toFixed(3));
    });
  }, [n]);

  useEffect(() => {
    reduced.current = !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    paint();
    const ring = ringRef.current;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (ring) io.observe(ring);
    const ro = new ResizeObserver(paint);
    if (ring) ro.observe(ring);
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(48, t - last);
      last = t;
      if (anim.current) {
        const p = Math.min(1, (t - anim.current.t0) / 900);
        angle.current = anim.current.from + (anim.current.to - anim.current.from) * EASE(p);
        if (p >= 1) anim.current = null;
        paint();
      } else if (!reduced.current && !paused.current && visible.current) {
        angle.current = (angle.current + dt * SPEED) % 360;
        paint();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [paint]);

  // While not pinned, the highlighted step follows whichever node is at the top.
  useEffect(() => {
    if (pinned) return;
    const id = window.setInterval(() => {
      let best = 0;
      let bestD = 999;
      for (let i = 0; i < n; i++) {
        const a = (((angle.current + (360 / n) * i + 90) % 360) + 360) % 360; // 0 = top
        const d = Math.min(a, 360 - a);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      setActive((cur) => (cur === best ? cur : best));
    }, 250);
    return () => window.clearInterval(id);
  }, [pinned, n]);

  const focusStep = (i: number) => {
    setActive(i);
    setPinned(true);
    paused.current = true;
    // rotate the shortest way so node i lands at the top (-90deg)
    const current = angle.current;
    const target = -90 - (360 / n) * i;
    const delta = ((target - current) % 360 + 540) % 360 - 180;
    if (reduced.current) {
      angle.current = current + delta;
      paint();
      return;
    }
    anim.current = { from: current, to: current + delta, t0: performance.now() };
  };

  const release = () => {
    setPinned(false);
    paused.current = false;
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nodeRefs.current[(i + 1) % n]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nodeRefs.current[(i - 1 + n) % n]?.focus();
    } else if (e.key === "Escape") {
      release();
    }
  };

  const s = processSteps[active];
  const Icon = ICONS[active] ?? Search;

  return (
    <div data-reveal className="orbit grid items-center gap-16 lg:grid-cols-12">
      <div
        className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-7"
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => {
          if (!ringRef.current?.contains(document.activeElement)) release();
        }}
      >
        {/* rings */}
        <div aria-hidden="true" className="orbit-ring absolute inset-[12%] rounded-full border border-hairline" />
        <div aria-hidden="true" className="absolute inset-[30%] rounded-full border border-dashed border-hairline/70" />
        <div aria-hidden="true" className="orbit-sweep absolute inset-[12%] rounded-full" />
        {/* core */}
        <div aria-hidden="true" className="orbit-core absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full">
          <span className="orbit-ping" />
          <span className="orbit-ping" style={{ animationDelay: "1.2s" }} />
          <span className="absolute inset-[30%] rounded-full bg-bone/90 blur-[1px]" />
        </div>
        {/* orbit plane: nodes are positioned from its center */}
        <div ref={ringRef} className="absolute inset-[12%]">
          <ol className="absolute left-1/2 top-1/2 h-0 w-0" aria-label="How we work">
            {processSteps.map((p, i) => {
              const I = ICONS[i] ?? Search;
              const on = i === active;
              return (
                <li key={p.title} className="contents">
                  <button
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    type="button"
                    aria-pressed={on && pinned}
                    aria-controls="orbit-detail"
                    onClick={() => focusStep(i)}
                    onFocus={() => focusStep(i)}
                    onBlur={(e) => {
                      if (!(e.relatedTarget as Element | null)?.closest?.(".orbit-node")) release();
                    }}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`orbit-node group absolute left-0 top-0 -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full ${on ? "is-on" : ""}`}
                  >
                    <span className="orbit-node-dot flex h-14 w-14 items-center justify-center rounded-full border">
                      <I aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="orbit-node-label pointer-events-none absolute top-full mt-3 whitespace-nowrap text-[13px] font-medium tracking-[0.02em]">
                      <span className="sr-only">{p.step}: </span>
                      {p.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div id="orbit-detail" aria-live="polite" className="spot spot-card relative overflow-hidden rounded-[14px] border border-hairline bg-surface/70 p-8">
          <span aria-hidden="true" className="spot-glow" />
          <div key={active} className="orbit-detail-in">
            <div className="flex items-center justify-between">
              <p className="label">{s.step}</p>
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-amber/40 text-amber">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </span>
            </div>
            <h3 className="mt-8 font-serif text-[52px] leading-none tracking-[-0.01em] text-bone">{s.title}</h3>
            <p className="mt-5 max-w-[34ch] text-[16px] text-muted">{s.body}</p>
            <p className="label mt-10 text-bone">
              <span aria-hidden="true" className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-amber align-middle" />
              {s.time}
            </p>
          </div>
          {/* progress across the four steps */}
          <div aria-hidden="true" className="mt-8 grid grid-cols-4 gap-2">
            {processSteps.map((p, i) => (
              <span key={p.title} className={`h-[2px] rounded-full transition-colors duration-500 ${i <= active ? "bg-amber" : "bg-hairline"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
