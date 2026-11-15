"use client";

import { useState } from "react";
import type { Testimonial } from "@/content/site";
import { SplitWords } from "./Motion";

/** One large pull-quote at a time. Manual cycling only (no auto-rotate). */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const t = items[i];
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  return (
    <figure className="relative" aria-roledescription="carousel" aria-label="Client testimonials">
      <div aria-live="polite" className="min-h-[340px] md:min-h-[300px]">
        <blockquote key={i} className="font-serif text-[clamp(32px,4.4vw,64px)] leading-[1.08] tracking-[-0.015em] text-bone">
          <span className="text-amber" aria-hidden="true">“</span>
          <SplitWords text={t.quote} />
          <span className="text-amber" aria-hidden="true">”</span>
        </blockquote>
      </div>
      <figcaption className="mt-10 flex flex-col gap-6 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
        <p className="label">
          <span className="text-bone">{t.name}</span> — {t.role} <span className="ml-2 rounded-full border border-hairline px-2 py-0.5">{t.tag}</span>
        </p>
        <div className="flex items-center gap-4">
          <p className="label tabular" aria-hidden="true">
            {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <button type="button" onClick={() => go(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-amber" aria-label="Previous testimonial">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-amber" aria-label="Next testimonial">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
      </figcaption>
      <p className="sr-only">Testimonial {i + 1} of {items.length}</p>
    </figure>
  );
}
