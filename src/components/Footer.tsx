import Link from "next/link";
import { BRAND, CAL_URL, TAGLINE, navLinks, offices, services } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { KnockButton } from "./KnockButton";
import { FooterFx } from "./FooterFx";

export function Footer() {
  const band = [...services.map((s) => s.title), TAGLINE];
  return (
    <footer data-mfooter className="mfooter relative isolate overflow-clip border-t border-hairline">
      <div data-mf-inner className="relative">
        {/* aurora + grid */}
        <div aria-hidden="true" data-mf-aurora className="pointer-events-none absolute inset-0 -z-10">
          <span className="mf-aurora mf-a1" />
          <span className="mf-aurora mf-a2" />
          <span className="mf-aurora mf-a3" />
        </div>
        <div aria-hidden="true" className="mf-grid pointer-events-none absolute inset-0 -z-10" />

        {/* diagonal marquee of official service names */}
        <div aria-hidden="true" className="mf-band relative -mx-4 mt-14 overflow-hidden border-y border-hairline bg-night/60 py-4 md:mt-20">
          <div className="mf-band-track flex w-max whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.18em] text-bone/70">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 gap-10 pr-10">
                {band.map((t) => (
                  <span key={t} className="flex items-center gap-10">
                    {t}
                    <span className="inline-block h-[6px] w-[6px] rounded-full bg-amber" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <Wordmark />
            <p className="mt-6 font-serif text-[34px] leading-[1.05] tracking-[-0.01em] text-bone">{TAGLINE}</p>
            <p className="mt-4 max-w-[34ch] text-[15px] text-muted">
              Software consultancy partner — web, mobile, AI, SaaS &amp; digital transformation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <KnockButton />
              <Link href="/contact" className="btn btn-outline mag">Send us a message</Link>
            </div>
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

        {/* giant masked type: the official company name */}
        <div aria-hidden="true" className="relative overflow-hidden">
          <p data-mf-type className="mf-type select-none whitespace-nowrap text-center font-medium leading-[0.86] tracking-[-0.06em]">
            {BRAND}
          </p>
        </div>

        <div className="shell relative flex flex-col gap-2 border-t border-hairline bg-night/70 py-6 text-[13px] text-muted backdrop-blur-sm md:flex-row md:justify-between">
          <p>© 2026 Techknock Limited. Techknock Labs is a trading name of Techknock Limited.</p>
          <p>{TAGLINE}</p>
        </div>
      </div>
      <FooterFx />
    </footer>
  );
}
