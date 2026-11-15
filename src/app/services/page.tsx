import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { FaqList } from "@/components/Faq";
import { KnockButton } from "@/components/KnockButton";
import { Testimonials } from "@/components/Testimonials";
import { DoorOpenCta, EngagementCards, PageHero, ProcessRow } from "@/components/Blocks";
import { CAL_URL, engagementsServices, industries, services, serviceOverview, servicesFaqs, testimonials } from "@/content/site";

export const metadata: Metadata = {
  title: "Services: AI, software and systems",
  description:
    "AI agents and automation, custom AI applications, SaaS products, web and mobile apps, and enterprise systems — designed, built and supported by senior engineers.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        n="01"
        label="Services"
        title="AI, software, and systems built for growth."
        intro="From custom AI applications to scalable SaaS platforms, we help businesses turn ideas into products that deliver measurable results."
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <KnockButton label="Book a call" />
          <Link href="/work" className="link-underline text-[15px] text-bone">See our work</Link>
        </div>
      </PageHero>

      <section aria-label="Our services" className="border-t border-hairline">
        <ol className="shell">
          {services.map((s, i) => {
            const o = serviceOverview[s.slug];
            return (
              <li key={s.slug} className="group relative grid gap-8 border-b border-hairline py-14 md:grid-cols-12 md:gap-10 md:py-20">
                <div className="md:col-span-6">
                  <p className="label tabular">{String(i + 1).padStart(2, "0")} / 05</p>
                  <h2 className="mt-5 text-[clamp(36px,4.4vw,64px)] font-medium leading-[1.04] tracking-[-0.035em] text-bone">
                    <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">{s.title}</Link>
                  </h2>
                  <p className="mt-6 flex items-baseline gap-3">
                    <span className="display-serif tabular text-[64px] text-bone">{o.count}</span>
                    <span className="label">{o.countLabel}</span>
                  </p>
                  <p className="mt-4 max-w-[56ch] text-[16px] text-muted">{o.body}</p>
                  <p className="label mt-5">{o.tags.join(" / ")}</p>
                  <p className="mt-8"><span className="link-underline text-[15px] text-bone">Explore {s.title}</span></p>
                </div>
                <div className="photo-zoom relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface md:col-span-6">
                  <Image src={o.image} alt={o.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="ch-eng" className="shell py-24 md:py-36">
        <Chapter id="ch-eng" n="02" label="Engagement models" title="Ways to work with us" />
        <div className="mt-16"><EngagementCards items={engagementsServices} /></div>
        <p className="mt-10">
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-[15px] text-bone">
            Let&apos;s discuss the best approach<span className="sr-only"> (opens cal.com in a new tab)</span>
          </a>
        </p>
      </section>

      <section aria-labelledby="ch-ind" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-ind" n="03" label="Industries" title="Industries we know" />
          <ul className="mt-16 flex flex-wrap gap-x-3 gap-y-4 md:pl-[25%]">
            {industries.map((x) => (
              <li key={x} className="text-[clamp(24px,2.6vw,38px)] leading-tight tracking-[-0.02em] text-bone">
                {x}<span aria-hidden="true" className="ml-3 text-muted">/</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ch-test" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-test" n="04" label="Testimonials" title="What clients say" intro={<p><span className="text-bone">5.0</span> average · verified Clutch reviews</p>} />
          <div className="mt-16 md:pl-[25%]"><Testimonials items={testimonials} /></div>
        </div>
      </section>

      <section aria-labelledby="ch-proc" className="border-t border-hairline">
        <div className="shell py-24 md:py-36">
          <Chapter id="ch-proc" n="05" label="How we work" title="From first call to launch, in four steps." />
          <div className="mt-16"><ProcessRow /></div>
        </div>
      </section>

      <section aria-labelledby="ch-faq" className="border-t border-hairline">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-12">
            <Chapter id="ch-faq" n="06" label="FAQ" title="Questions, answered." intro={<p>Still have a question? <Link href="/contact" className="link-underline text-bone">Talk to us</Link></p>} />
          </div>
          <div className="md:col-span-9 md:col-start-4"><FaqList items={servicesFaqs} /></div>
        </div>
      </section>

      <DoorOpenCta
        n="07"
        heading="Not sure where to start?"
        body="Tell us what you're trying to achieve. We'll recommend the right approach and give you a clear estimate within 1-2 days."
      />
    </>
  );
}
