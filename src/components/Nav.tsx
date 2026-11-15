"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CAL_URL, navLinks } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuFor, setMenuFor] = useState(pathname);

  // Close the mobile menu when the route changes.
  if (menuFor !== pathname) {
    setMenuFor(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline/70 bg-night/80 backdrop-blur-md supports-[backdrop-filter]:bg-night/60">
      <nav aria-label="Primary" className="shell grid h-[var(--nav-h)] grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
        <Wordmark />
        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-quiet text-[14px] transition-colors ${active ? "text-bone" : "text-muted hover:text-bone"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-end gap-3">
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline hidden sm:inline-flex">
            Book a call<span className="sr-only"> (opens cal.com in a new tab)</span>
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.4" />
              ) : (
                <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.4" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" hidden={!open} className="border-t border-hairline bg-night lg:hidden">
        <ul className="shell flex flex-col py-4">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="flex min-h-12 items-center border-b border-hairline/60 text-[22px] text-bone">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
              Book a free strategy call
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
