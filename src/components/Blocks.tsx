import Image from "next/image";
import Link from "next/link";
import {
  bigStats,
  clients,
  CAL_URL,
  processSteps,
  type CaseStudy,
  type Engagement,
  type Post,
  coverFor,
} from "@/content/site";
import { KnockButton } from "./KnockButton";
import { CountUp } from "./CountUp";
import { SplitWords } from "./Motion";

export function ClientLogos({ label }: { label: string }) {
  const set = (dup: boolean) => (
    <ul className="marquee-set" aria-hidden={dup ? true : undefined}>
      {clients.map((c) => (
        <li key={c.name}>
          <Image
            src={c.logo}
            alt={dup ? "" : c.name}
            width={160}
            height={48}
            className="h-auto max-h-7 w-auto max-w-[140px] object-contain opacity-55 transition-opacity duration-150 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-center">
      <p className="label md:col-span-3">{label}</p>
      <div className="marquee md:col-span-9">
        <div className="marquee-track">
          {set(false)}
          {set(true)}
        </div>
      </div>
    </div>
  );
}

export function GiantStats() {
  return (
    <dl data-stagger className="grid grid-cols-1 border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
      {bigStats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col border-b border-hairline py-10 sm:px-6 lg:border-b-0 lg:py-14 ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 0 ? "lg:border-l" : ""} ${i === 0 ? "sm:pl-0" : ""}`}
        >
          <dt className="label order-2 mt-4 block">
            <span className="block text-bone">{s.label}</span>
            <span className="block">{s.note}</span>
          </dt>
          <dd className="display-serif tabular -order-1 text-[clamp(84px,9vw,148px)] text-bone"><CountUp value={s.value} /></dd>
        </div>
      ))}
    </dl>
  );
}

export function ProcessRow() {
  return (
    <ol data-stagger className="steps relative grid gap-0 border-t border-hairline md:grid-cols-2 lg:grid-cols-4">
      <li aria-hidden="true" className="steps-line" />
      {processSteps.map((p, i) => (
        <li key={p.title} className={`step relative flex flex-col border-b border-hairline py-8 md:px-6 lg:border-b-0 ${i > 0 ? "lg:border-l" : "md:pl-0"} ${i % 2 === 1 ? "md:border-l" : ""}`}>
          <p className="label">{p.step}</p>
          <h3 className="mt-10 font-serif text-[44px] leading-none tracking-[-0.01em] text-bone">{p.title}</h3>
          <p className="mt-4 max-w-[30ch] text-[15px] text-muted">{p.body}</p>
          <p className="label mt-8 text-bone md:mt-auto md:pt-10">
            <span aria-hidden="true" className="step-dot mr-2 inline-block h-[7px] w-[7px] rounded-full bg-amber align-middle" />
            {p.time}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function EngagementCards({ items }: { items: Engagement[] }) {
  return (
    <div data-stagger className="grid gap-4 lg:grid-cols-3">
      {items.map((e) => (
        <article key={e.title} className="spot lift relative flex flex-col overflow-hidden rounded-[14px] border border-hairline bg-surface p-8 hover:border-[#4a4640]">
          <span aria-hidden="true" className="spot-glow" />
          <h3 className="text-[22px] font-medium text-bone">{e.title}</h3>
          <p className="label mt-6">Best when</p>
          <p className="mt-1 text-[15px] text-bone/85">{e.bestWhen}</p>
          <p className="mt-4 text-[15px] text-muted">{e.body}</p>
          <p className="mt-auto pt-10">
            <span className="label block">From</span>
            <span className="display-serif tabular text-[64px] text-bone"><CountUp value={e.from} /></span>
            {e.unit ? <span className="ml-2 text-[15px] text-muted">{e.unit}</span> : null}
          </p>
        </article>
      ))}
    </div>
  );
}

export function BlogCards({ items }: { items: Post[] }) {
  return (
    <ul data-stagger className="grid gap-x-8 gap-y-12 md:grid-cols-3">
      {items.map((p) => (
        <li key={p.slug} className="group relative">
          <div className="cover-zoom relative aspect-[16/9] overflow-hidden rounded-[14px] border border-hairline bg-surface">
            <Image src={coverFor(p.category)} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
          </div>
          <p className="label mt-6">
            {p.category} <span aria-hidden="true">/</span> <time dateTime={p.iso}>{p.date}</time> <span aria-hidden="true">/</span> {p.readTime}
          </p>
          <h3 className="mt-5 text-[24px] font-medium leading-[1.2] tracking-[-0.015em] text-bone">
            <Link href={`/blog/${p.slug}`} className="link-quiet after:absolute after:inset-0 group-hover:text-white">
              {p.title}
            </Link>
          </h3>
          <p className="mt-4 text-[15px] text-muted">{p.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}

/** Full-bleed case row: image + big serif title + mono stack tags. */
export function CaseRow({ c, industry, priority = false, flip = false }: { c: CaseStudy; industry?: string; priority?: boolean; flip?: boolean }) {
  return (
    <article className="group relative grid gap-8 border-t border-hairline py-12 md:grid-cols-12 md:gap-10 md:py-16">
      <div data-wipe className={`photo-zoom relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        {c.image ? (
          <Image src={c.image} alt={`${c.name} — ${industry ?? c.industry}`} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" priority={priority} />
        ) : (
          <div className="flex h-full items-end p-8">
            <p className="display-serif text-[64px] text-bone/30">{c.name}</p>
          </div>
        )}
      </div>
      <div data-reveal className="flex flex-col md:col-span-5">
        <p className="label">{c.card.category} <span aria-hidden="true">/</span> {industry ?? c.industry}</p>
        <h3 className="display-serif mt-5 text-[clamp(52px,5.6vw,88px)] text-bone">{c.name}</h3>
        <p className="mt-5 max-w-[46ch] text-[16px] text-muted">{c.card.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {c.card.tags.map((t) => (
            <li key={t} className="rounded-full border border-hairline px-3 py-1 font-mono text-[13px] text-bone/80">{t}</li>
          ))}
        </ul>
        <p className="mt-8 md:mt-auto md:pt-8">
          <Link href={`/work/${c.slug}`} className="link-underline text-[15px] text-bone after:absolute after:inset-0">
            Read case study
          </Link>
        </p>
      </div>
    </article>
  );
}

/** Closing chapter: the door, fully open. Copy sits on the dark wall, never over the light. */
export function DoorOpenCta({
  n = "",
  heading,
  body,
  button = "Book a free strategy call",
  buttonHref = CAL_URL,
  messageLink = true,
}: {
  n?: string;
  heading: string;
  body: string;
  button?: string;
  buttonHref?: string;
  messageLink?: boolean;
}) {
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-clip border-t border-hairline">
      <div data-wipe="door" className="absolute inset-0 -z-10 hidden md:block">
        <Image src="/img/door-open.webp" alt="" fill sizes="100vw" className="object-cover object-[62%_50%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.55)_34%,rgba(10,10,10,0)_60%)]" />
      </div>
      <div className="shell grid min-h-[min(92svh,900px)] py-20 md:grid-cols-12 md:py-24">
        <div className="flex flex-col md:col-span-5">
          <div data-reveal>
            <p className="label">{n ? <><span className="text-bone">{n}</span> — </> : null}Available for new projects</p>
            <h2 id="cta-heading" className={`mt-6 font-medium leading-[0.98] tracking-[-0.04em] text-bone ${heading.length > 32 ? "max-w-[15ch] text-[clamp(40px,4.6vw,68px)]" : "max-w-[11ch] text-[clamp(48px,6.2vw,96px)]"}`}>
              <SplitWords text={heading} variant="h" />
            </h2>
          </div>
          <div className="relative -mx-[var(--gutter)] my-10 aspect-[4/5] md:hidden">
            <Image src="/img/door-open.webp" alt="" fill sizes="100vw" className="object-cover object-[50%_50%]" />
          </div>
          <div className="md:mt-auto">
            <p className="max-w-[44ch] text-[17px] text-bone/85">{body}</p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <KnockButton label={button} href={buttonHref} />
              {messageLink ? <Link href="/contact" className="link-underline text-[15px] text-bone">or send us a message</Link> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ n, label, title, intro, children }: { n: string; label: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="shell pb-16 pt-[calc(var(--nav-h)+72px)] md:pb-24 md:pt-[calc(var(--nav-h)+112px)]">
      <div className="hero-in grid gap-6 md:grid-cols-12 md:gap-8">
        <p className="label md:col-span-3 md:pt-4"><span className="text-bone">{n}</span> — {label}</p>
        <div className="md:col-span-9">
          <h1 className="max-w-[16ch] text-[clamp(48px,7vw,112px)] font-medium leading-[0.98] tracking-[-0.04em] text-bone"><SplitWords text={title} variant="h" /></h1>
          {intro ? <p className="mt-8 max-w-[60ch] text-[18px] text-muted">{intro}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
