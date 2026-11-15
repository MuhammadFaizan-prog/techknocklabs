import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { KnockButton } from "@/components/KnockButton";
import { FaqList } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { CountUp } from "@/components/CountUp";
import { AgentLog, ProcessShowcase } from "@/components/Showcase";
import {
  BlogCards,
  ClientLogos,
  DoorOpenCta,
  EngagementCards,
  GiantStats,
  ProcessRow,
} from "@/components/Blocks";
import {
  CAL_URL,
  engagementsHome,
  featuredIndustry,
  getCase,
  heroIntro,
  homeFaqs,
  posts,
  reasons,
  resources,
  rotatingWhat,
  services,
  serviceOverview,
  testimonials,
} from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Techknock Labs — Tech knocks at your door" },
  description:
    "Software development and AI solutions for startups and growing businesses. 138+ projects delivered, 5.0 on Clutch, and a reply within 1 working day.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const clone = getCase("clone-caller")!;
  const stacked = ["a1-renovations", "justtravel", "secure-living"].map((s) => getCase(s)!);

  return (
    <>
      {/* 01 — Hero: the door ajar */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-clip">
        <div className="hero-door pointer-events-none absolute inset-0 -z-10 hidden md:block">
          <Image
            src="/img/door-ajar.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-par object-cover object-[72%_50%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.2)_45%,rgba(10,10,10,0)_100%)]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#0a0a0a,rgba(10,10,10,0))]" />
        </div>

        <div className="shell relative flex min-h-[100svh] flex-col pt-[calc(var(--nav-h)+56px)] md:pt-[calc(var(--nav-h)+72px)]">
          <div className="hero-in flex flex-1 flex-col">
            <p className="label">
              <span className="text-bone">01</span> — Software development · AI solutions
            </p>
            <h1 id="hero-title" className="hero-title mt-8 text-bone">
              <span className="line-mask text-[clamp(52px,7vw,104px)] font-medium leading-[1] tracking-[-0.045em]"><span>Tech knocks</span></span>
              <span className="line-mask display-serif text-[clamp(88px,12.4vw,184px)] italic leading-[0.88]"><span>at your</span></span>
              <span className="line-mask display-serif text-[clamp(88px,12.4vw,184px)] italic leading-[0.88]"><span>door.</span></span>
            </h1>
            <p className="mt-8 text-[17px] leading-[1.55] text-bone">
              We build the next generation of{" "}
              <span className="rotator" aria-hidden="true">
                <span className="rotator-track">
                  {[...rotatingWhat, rotatingWhat[0]].map((w, i) => (
                    <span key={i}>{w}.</span>
                  ))}
                </span>
              </span>
              <span className="sr-only">{rotatingWhat.join(", ")}.</span>
            </p>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.55] text-bone/80">{heroIntro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <KnockButton />
              <Link href="/work" className="link-underline text-[15px] text-bone">See our work</Link>
            </div>

            {/* Mobile: the door sits under the copy */}
            <div className="relative -mx-[var(--gutter)] mt-12 aspect-[4/5] md:hidden">
              <Image src="/img/door-ajar.webp" alt="" fill sizes="100vw" className="object-cover object-[74%_50%]" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,#0a0a0a,rgba(10,10,10,0))]" />
            </div>

            <div className="hero-show pointer-events-none absolute right-[var(--gutter)] top-[calc(100svh-360px)] hidden w-[320px] lg:block">
              <ProcessShowcase />
            </div>

            <dl className="mt-auto grid grid-cols-1 border-t border-hairline pt-0 sm:grid-cols-3 md:mt-auto">
              {[
                ["138+", "projects delivered"],
                ["5.0", "on Clutch"],
                ["1 working day", "reply within"],
              ].map(([v, l], i) => (
                <div key={l} className={`flex items-baseline gap-3 border-b border-hairline py-5 sm:border-b-0 sm:py-7 ${i > 0 ? "sm:border-l sm:pl-8" : ""}`}>
                  {i === 2 ? (
                    <>
                      <dt className="label order-1">Reply within</dt>
                      <dd className="order-2 text-[20px] font-medium text-bone">1 working day</dd>
                    </>
                  ) : (
                    <>
                      <dt className="label order-2">{l === "on Clutch" ? "on Clutch" : l}</dt>
                      <dd className="tabular order-1 text-[20px] font-medium text-bone"><CountUp value={v} /></dd>
                    </>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="shell border-t border-hairline py-12">
        <ClientLogos label="Trusted by startups and growing businesses" />
      </div>

      {/* 02 — What we do */}
      <section aria-labelledby="ch-02" className="shell py-24 md:py-36">
        <Chapter id="ch-02" n="02" label="What we do" title="Intelligent solutions. Lasting impact." />
        <ol data-stagger className="bento mt-16 grid gap-4 md:mt-24 md:grid-cols-6">
          {services.map((s, i) => {
            const o = serviceOverview[s.slug];
            const big = i === 0;
            const span = ["md:col-span-6 lg:col-span-4 lg:row-span-2", "md:col-span-3 lg:col-span-2", "md:col-span-3 lg:col-span-2", "md:col-span-3", "md:col-span-3"][i];
            return (
              <li key={s.slug} className={`group spot lift relative flex flex-col overflow-hidden rounded-[14px] border border-hairline bg-surface/70 p-7 hover:border-[#4a4640] md:p-8 ${span}`}>
                <span aria-hidden="true" className="spot-glow" />
                <div className="flex items-center justify-between">
                  <p className="label tabular">{String(i + 1).padStart(2, "0")}</p>
                  <p className="label text-right"><span className="text-bone"><CountUp value={o.count} /></span> {o.countLabel}</p>
                </div>
                <div className={big ? "mt-10 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end" : "mt-8"}>
                  <div>
                    <h3 className={`font-medium leading-[1.04] tracking-[-0.03em] text-bone ${big ? "text-[clamp(34px,3.8vw,60px)]" : "text-[28px]"}`}>
                      <Link href={`/services/${s.slug}`} className="link-quiet after:absolute after:inset-0 group-hover:text-white">
                        {s.title}
                      </Link>
                    </h3>
                    <p className={`pt-5 text-[15px] text-muted ${big ? "max-w-[52ch] text-[16px]" : ""}`}>{o.body}</p>
                  </div>
                  {big ? <div className="hidden md:block"><AgentLog /></div> : null}
                </div>
                <p className="label mt-auto pt-8 text-[12px]">{o.tags.join(" / ")}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-10">
          <Link href="/services" className="link-underline text-[15px] text-bone">All services</Link>
        </p>
      </section>

      {/* 03 — Featured case studies: the door opens into Clone Caller */}
      <section aria-labelledby="ch-03" className="border-t border-hairline">
        <div className="shell pt-24 md:pt-36">
          <Chapter id="ch-03" n="03" label="Featured case studies" title="Building products that businesses rely on." />
        </div>

        <div className="door-stage mt-16">
          <div className="door-sticky">
            <div className="door-mask">
              <Image src={clone.image!} alt={`${clone.name} — ${featuredIndustry[clone.slug]}`} fill sizes="100vw" className="object-cover object-top brightness-[0.82]" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#0a0a0a_0%,#0a0a0a_34%,rgba(10,10,10,0.05)_72%)]" />
            </div>
            <div aria-hidden="true" className="door-slit pointer-events-none absolute top-[14%] bottom-0 left-1/2 w-px -translate-x-1/2 bg-amber shadow-[0_0_24px_6px_rgba(242,166,90,0.45)]" />
            <div className="door-copy relative z-10 mt-auto w-full self-end">
              <div className="shell grid gap-6 pb-14 md:grid-cols-12 md:pb-20">
                <div className="md:col-span-7">
                  <p className="label text-bone/80">{clone.card.category} / {featuredIndustry[clone.slug]}</p>
                  <h3 className="display-serif mt-4 text-[clamp(72px,10vw,160px)] text-bone">{clone.name}</h3>
                </div>
                <div className="flex flex-col justify-end md:col-span-5">
                  <p className="max-w-[46ch] text-[17px] text-bone/85">{clone.card.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {clone.card.tags.map((t) => (
                      <li key={t} className="rounded-full border border-bone/25 px-3 py-1 font-mono text-[13px] text-bone/85">{t}</li>
                    ))}
                  </ul>
                  <p className="mt-7">
                    <Link href={`/work/${clone.slug}`} className="link-underline text-[15px] text-bone">Read case study</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {stacked.map((c, i) => (
            <article
              key={c.slug}
              className="group border-t border-hairline bg-night md:sticky md:top-[var(--nav-h)] md:h-[calc(100svh-var(--nav-h))]"
              style={{ zIndex: i + 1 }}
            >
              <div className="shell grid h-full gap-8 py-12 md:grid-cols-12 md:items-center md:gap-10 md:py-14">
                <div className="flex flex-col md:col-span-5">
                  <p className="label">
                    <span className="tabular text-bone">{String(i + 2).padStart(2, "0")}</span> / 04 — {c.card.category}
                  </p>
                  <h3 className="display-serif mt-5 text-[clamp(60px,6.4vw,104px)] text-bone">{c.name}</h3>
                  <p className="label mt-3">{featuredIndustry[c.slug]}</p>
                  <p className="mt-6 max-w-[44ch] text-[16px] text-muted">{c.card.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.card.tags.map((t) => (
                      <li key={t} className="rounded-full border border-hairline px-3 py-1 font-mono text-[13px] text-bone/80">{t}</li>
                    ))}
                  </ul>
                  <p className="mt-8">
                    <Link href={`/work/${c.slug}`} className="link-underline text-[15px] text-bone">Read case study</Link>
                  </p>
                </div>
                <Link href={`/work/${c.slug}`} tabIndex={-1} aria-hidden="true" data-wipe className="photo-zoom relative block aspect-[16/10] overflow-hidden rounded-[14px] bg-surface md:col-span-7">
                  <Image src={c.image!} alt="" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="shell border-t border-hairline py-10">
          <Link href="/work" className="link-underline text-[15px] text-bone">View all case studies</Link>
        </div>
      </section>

      {/* 04 — Numbers */}
      <section aria-labelledby="ch-04" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <p data-reveal className="label">
            <span className="text-bone">04</span> — <span id="ch-04">Track record</span>
          </p>
          <div className="mt-12">
            <GiantStats />
          </div>
        </div>
      </section>

      {/* 05 — Why */}
      <section aria-labelledby="ch-05" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-05" n="05" label="Why Techknock Labs" title="Why teams choose Techknock Labs" />
          <ol data-stagger className="mt-16 grid gap-4 md:mt-24 md:grid-cols-6">
            {reasons.map((r, i) => (
              <li key={r.title} className={`spot lift relative flex flex-col overflow-hidden rounded-[14px] border border-hairline bg-surface/70 p-7 hover:border-[#4a4640] md:p-8 ${["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"][i]}`}>
                <span aria-hidden="true" className="spot-glow" />
                <p className="label tabular flex items-center gap-2">{i === 0 ? <span className="pulse-dot" aria-hidden="true" /> : null}{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`mt-10 font-medium tracking-[-0.02em] text-bone ${i === 0 ? "text-[clamp(30px,3vw,44px)] leading-[1.08]" : "text-[24px] leading-[1.15]"}`}>{r.title}</h3>
                <p className="mt-4 max-w-[52ch] text-[15px] text-muted">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 — Process */}
      <section aria-labelledby="ch-06" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-06" n="06" label="How we work" title="From first call to launch, in four steps." />
          <div className="mt-16 md:mt-24"><ProcessRow /></div>
        </div>
      </section>

      {/* 07 — Engagement */}
      <section aria-labelledby="ch-07" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-07" n="07" label="Engagement models" title="Ways to work with us" />
          <div className="mt-16 md:mt-24"><EngagementCards items={engagementsHome} /></div>
          <p className="mt-10">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-[15px] text-bone">
              Not sure which fits? Book a free call<span className="sr-only"> (opens cal.com in a new tab)</span>
            </a>
          </p>
        </div>
      </section>

      {/* 08 — Testimonials */}
      <section aria-labelledby="ch-08" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-08" n="08" label="Testimonials" title="What clients say" intro={<p><span className="text-bone">5.0</span> average · verified Clutch reviews</p>} />
          <div className="mt-16 md:mt-24 md:pl-[25%]"><Testimonials items={testimonials} /></div>
          <div className="mt-24 border-t border-hairline pt-12">
            <ClientLogos label="Clients we've worked with" />
          </div>
        </div>
      </section>

      {/* 09 — Resources */}
      <section aria-labelledby="ch-09" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-09" n="09" label="Free resources" title="Not ready to talk yet?" />
          <ul data-stagger className="mt-16 border-t border-hairline md:mt-24">
            {resources.map((r) => (
              <li key={r.title} className="group relative grid gap-4 border-b border-hairline py-10 md:grid-cols-12 md:items-center md:gap-8">
                <h3 className="text-[clamp(28px,3vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-bone md:col-span-4 md:col-start-4">{r.title}</h3>
                <p className="text-[16px] text-muted md:col-span-3">{r.body}</p>
                <p className="md:col-span-2 md:text-right">
                  <Link href={r.href} className="link-underline whitespace-nowrap text-[15px] text-bone after:absolute after:inset-0">{r.cta}</Link>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section aria-labelledby="ch-10" className="border-t border-hairline">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-12">
            <Chapter
              id="ch-10"
              n="10"
              label="FAQ"
              title="Questions, answered."
              intro={<p>Still have a question? <Link href="/contact" className="link-underline text-bone">Talk to us</Link></p>}
            />
          </div>
          <div className="md:col-span-9 md:col-start-4"><FaqList items={homeFaqs} /></div>
        </div>
      </section>

      {/* 11 — Blog */}
      <section aria-labelledby="ch-11" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter
            id="ch-11"
            n="11"
            label="Latest insights"
            title="From the blog"
            aside={<p className="mt-6"><Link href="/blog" className="link-underline text-[15px] text-bone">All articles</Link></p>}
          />
          <div className="mt-16 md:mt-20"><BlogCards items={posts.slice(0, 3)} /></div>
        </div>
      </section>

      <DoorOpenCta
        n="12"
        heading="Let's build what's next."
        body="Tell us what you're building. We'll reply within one working day with honest advice, even if we're not the right fit."
      />
    </>
  );
}
