import Link from "next/link";
import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { Testimonials } from "@/components/Testimonials";
import { CaseRow, ClientLogos, DoorOpenCta, PageHero } from "@/components/Blocks";
import { caseStudies, testimonials } from "@/content/site";

export const metadata: Metadata = {
  title: "Work: case studies in AI, SaaS and software",
  description:
    "Selected Techknock Labs case studies: AI voice agents, clinical-trial platforms, PropTech, procurement tools, travel AI, EdTech and more — with stacks and results.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        n="01"
        label="Selected work"
        title="Innovative solutions across all domains."
        intro="Every project is an opportunity to solve complex challenges and create meaningful business impact. From AI-powered automation and SaaS platforms to enterprise systems and digital products, we build technology that helps businesses grow, scale, and stay ahead."
      />
      <section aria-label="Case studies" className="shell">
        {caseStudies.map((c, i) => (
          <CaseRow key={c.slug} c={c} priority={i === 0} flip={i % 2 === 1} />
        ))}
      </section>

      <section aria-labelledby="ref" className="border-t border-hairline">
        <div className="shell grid gap-8 py-24 md:grid-cols-12 md:items-end md:py-32">
          <div className="md:col-span-8">
            <Chapter id="ref" n="02" label="References" title="Want to speak to a client?" intro={<p>We&apos;re happy to connect you with past clients in your industry, or share a deeper case study for a project like yours.</p>} />
          </div>
          <p className="md:col-span-4 md:text-right">
            <Link href="/contact?interest=reference" className="btn btn-primary">Request a reference</Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="t" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="t" n="03" label="Testimonials" title="What clients say" intro={<p><span className="text-bone">5.0</span> average · verified Clutch reviews</p>} />
          <div className="mt-16 md:pl-[25%]"><Testimonials items={testimonials} /></div>
          <div className="mt-24 border-t border-hairline pt-12"><ClientLogos label="Clients we've worked with" /></div>
        </div>
      </section>

      <DoorOpenCta
        n="04"
        heading="Want results like these?"
        body="Tell us what you're building. We'll show you relevant work and give you a clear estimate within 1-2 days."
      />
    </>
  );
}
