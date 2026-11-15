import Link from "next/link";
import { CAL_URL, TAGLINE, navLinks, offices, services } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Wordmark />
          <p className="mt-6 font-serif text-[34px] leading-[1.05] tracking-[-0.01em] text-bone">{TAGLINE}</p>
          <p className="mt-4 max-w-[34ch] text-[15px] text-muted">
            Software consultancy partner — web, mobile, AI, SaaS &amp; digital transformation.
          </p>
        </div>
        <div className="md:col-span-3">
          <h2 className="label">Services</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="link-quiet text-bone/85 hover:text-bone" href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="label">Company</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {navLinks.filter((l) => l.href !== "/services").map((l) => (
              <li key={l.href}>
                <Link className="link-quiet text-bone/85 hover:text-bone" href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="label">Contact</h2>
          <ul className="mt-4 space-y-4 text-[15px] text-bone/85">
            <li>
              <Link className="link-underline" href="/contact">Send us a message</Link>
              <span className="mx-2 text-muted">or</span>
              <a className="link-underline" href={CAL_URL} target="_blank" rel="noopener noreferrer">book a call</a>
            </li>
            {offices.slice(0, 2).map((o) => (
              <li key={o.code}>
                <address className="not-italic">{o.address}</address>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-hairline py-6 text-[13px] text-muted md:flex-row md:justify-between">
        <p>© 2026 Techknock Limited. Techknock Labs is a trading name of Techknock Limited.</p>
        <p>{TAGLINE}</p>
      </div>
    </footer>
  );
}
