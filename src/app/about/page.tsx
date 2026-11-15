import Image from "next/image";
import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { Testimonials } from "@/components/Testimonials";
import { ClientLogos, DoorOpenCta, GiantStats } from "@/components/Blocks";
import { offices, promises, team, testimonials } from "@/content/site";

export const metadata: Metadata = {
  title: "About: a senior engineering team for software and AI",
  description:
    "Since 2021 Techknock Labs has helped startups and growing businesses in the US, UK and Middle East design, build and run software products and AI systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="shell pb-16 pt-[calc(var(--nav-h)+72px)] md:pb-24 md:pt-[calc(var(--nav-h)+112px)]">
        <div className="hero-in grid gap-6 md:grid-cols-12 md:gap-8">
          <p className="label md:col-span-3 md:pt-4"><span className="text-bone">01</span> — About Techknock Labs</p>
          <div className="md:col-span-9">
            <h1 className="max-w-[16ch] text-[clamp(48px,7vw,112px)] font-medium leading-[0.98] tracking-[-0.04em] text-bone">
              A senior engineering team for software and AI.
            </h1>
            <p className="mt-8 max-w-[60ch] text-[18px] text-muted">
              Since 2021, Techknock Labs has helped startups and growing businesses in the US, UK, and the Middle East. We design, build, and run software products and AI systems, with senior engineers on every project instead of a rotating bench.
            </p>
          </div>
        </div>
      </section>
      <div className="shell">
        <div className="relative aspect-[1584/672] overflow-hidden rounded-[14px] bg-surface">
          <Image
            src="/people/office.jpg"
            alt="Techknock Labs office: four people working together at a table with laptops, app wireframes on the whiteboard"
            fill
            priority
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section aria-labelledby="story" className="shell grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-12">
          <Chapter id="story" n="02" label="Our story" title="Why we started Techknock Labs" />
        </div>
        <div className="space-y-6 md:col-span-8 md:col-start-4">
          <p className="text-[clamp(22px,2vw,28px)] leading-[1.4] tracking-[-0.01em] text-bone">
            Techknock Labs started in 2021, when our founder and CEO, Ahmed Khan, saw too many businesses paying for software that was rushed, handed to junior developers, and rebuilt a year later.
          </p>
          <p className="max-w-[66ch] text-[17px] text-muted">
            We set out to build the opposite: a small, senior team that treats every client&apos;s product like its own. We scope honestly, show working software every week, and stay accountable long after launch.
          </p>
          <p className="max-w-[66ch] text-[17px] text-muted">
            Today we&apos;re a team of 25 engineers, designers and product people. We&apos;ve delivered 138+ projects across SaaS, web, mobile, enterprise systems and AI, from first MVPs to platforms used by 2.5M+ users.
          </p>
        </div>
      </section>

      <section aria-labelledby="founder" className="border-t border-hairline">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-3">
            <p className="label"><span className="text-bone">03</span> — Founder</p>
            <div aria-hidden="true" className="mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-hairline font-serif text-[44px] text-bone">AK</div>
            <h2 id="founder" className="mt-6 text-[28px] font-medium tracking-[-0.02em] text-bone">Ahmed Khan</h2>
            <p className="label mt-1">Founder &amp; CEO</p>
            <p className="mt-4 max-w-[34ch] text-[15px] text-muted">8+ years building software and AI for multiple industries. Leads every client engagement from scoping to delivery.</p>
            <p className="mt-6">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="link-underline text-[15px] text-bone">
                Connect on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
          <figure className="md:col-span-8 md:col-start-5">
            <blockquote className="font-serif text-[clamp(32px,3.8vw,56px)] leading-[1.1] tracking-[-0.01em] text-bone">
              <span className="text-amber" aria-hidden="true">“</span>Most clients come to us after a bad experience with an agency or freelancer. My promise is simple: you&apos;ll always speak to a senior engineer, you&apos;ll see progress every week, and you&apos;ll get honest advice, even when that means building less.<span className="text-amber" aria-hidden="true">”</span>
            </blockquote>
            <figcaption className="label mt-8"><span className="text-bone">Ahmed Khan</span> — Founder &amp; CEO</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="prom" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="prom" n="04" label="Our promises" title="How we work with clients" />
          <ol className="mt-16 grid border-t border-hairline md:grid-cols-2">
            {promises.map((p, i) => (
              <li key={p.title} className={`border-b border-hairline py-8 md:px-8 ${i % 2 === 0 ? "md:pl-0" : "md:border-l"}`}>
                <p className="label tabular">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[26px] font-medium tracking-[-0.02em] text-bone">{p.title}</h3>
                <p className="mt-3 max-w-[48ch] text-[16px] text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="team" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="team" n="05" label="Our Executive Team" title="The people behind your project" intro={<p>Your project is built by the people below, not outsourced or passed to someone you&apos;ve never met.</p>} />
          <ul className="mt-16 grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-5">
            {team.map((m) => (
              <li key={m.role} className="border-b border-hairline py-6 sm:pr-6">
                <p className="text-[18px] font-medium text-bone">{m.name ?? m.role}</p>
                <p className="label mt-1">{m.name ? m.role : "Team member"}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="where" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter
            id="where"
            n="06"
            label="Where we are"
            title="US & UK, built by a global team"
            intro={<><p>We&apos;re based in the UK and the US, with a global engineering team. We work in UK and US business hours, so you always get live time with your team, plus senior engineers at a cost that makes sense.</p><p className="mt-4">This setup gives you senior engineers at a cost that makes sense, without compromising on communication or quality.</p></>}
          />
          <ul className="mt-16 grid gap-0 border-t border-hairline md:grid-cols-3">
            {offices.map((o, i) => (
              <li key={o.code} className={`border-b border-hairline py-8 md:border-b-0 md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l"}`}>
                <p className="text-[28px] leading-none" aria-hidden="true">{o.flag}</p>
                <h3 className="mt-6 font-serif text-[40px] leading-none text-bone">{o.region}</h3>
                <address className="mt-4 max-w-[34ch] text-[15px] not-italic text-muted">{o.address}</address>
                <p className="label mt-6 text-bone">{o.hours}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Track record" className="border-t border-hairline">
        <div className="shell py-20"><GiantStats /></div>
      </section>

      <section aria-labelledby="t" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="t" n="07" label="Testimonials" title="What clients say" intro={<p><span className="text-bone">5.0</span> average · verified Clutch reviews</p>} />
          <div className="mt-16 md:pl-[25%]"><Testimonials items={testimonials} /></div>
          <div className="mt-24 border-t border-hairline pt-12"><ClientLogos label="Clients we've worked with" /></div>
        </div>
      </section>

      <DoorOpenCta
        n="08"
        heading="Let's build something together"
        body="Tell us what you're working on. You'll speak to a senior engineer, not a salesperson, and hear back within 1-2 days."
      />
    </>
  );
}
