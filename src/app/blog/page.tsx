import Link from "next/link";
import type { Metadata } from "next";
import { DoorOpenCta, PageHero } from "@/components/Blocks";
import { posts } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog: insights on AI, SaaS and building software",
  description:
    "Practical, plain-English guides for founders and business leaders: what to build, what it costs, and how to get AI, SaaS and software projects right.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero
        n="01"
        label="Blog"
        title="Insights on AI, SaaS and building software."
        intro="Practical, plain-English guides for founders and business leaders: what to build, what it costs, and how to get it right."
      />
      <section aria-label="Articles" className="shell pb-28">
        <article className="group relative grid gap-6 border-t border-hairline py-14 md:grid-cols-12 md:gap-8">
          <p className="label md:col-span-3">
            Latest <span aria-hidden="true">/</span> {lead.category}
          </p>
          <div className="md:col-span-9">
            <h2 className="display-serif max-w-[20ch] text-[clamp(44px,5.4vw,84px)] leading-[1] text-bone">
              <Link href={`/blog/${lead.slug}`} className="after:absolute after:inset-0 group-hover:text-white">{lead.title}</Link>
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] text-muted">{lead.excerpt}</p>
            <p className="label mt-6"><time dateTime={lead.iso}>{lead.date}</time> <span aria-hidden="true">/</span> {lead.readTime}</p>
          </div>
        </article>
        <ul className="border-t border-hairline">
          {rest.map((p) => (
            <li key={p.slug} className="group relative grid gap-3 border-b border-hairline py-8 md:grid-cols-12 md:items-baseline md:gap-8">
              <p className="label md:col-span-3">
                <time dateTime={p.iso}>{p.date}</time> <span aria-hidden="true">/</span> {p.category}
              </p>
              <h2 className="text-[clamp(22px,2.2vw,30px)] font-medium leading-[1.2] tracking-[-0.02em] text-bone md:col-span-6">
                <Link href={`/blog/${p.slug}`} className="link-quiet after:absolute after:inset-0">{p.title}</Link>
              </h2>
              <p className="text-[15px] text-muted md:col-span-3">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>

      <DoorOpenCta
        heading="Have a project in mind?"
        body="Tell us what you're trying to achieve. We'll recommend the right approach and give you a clear estimate within 1-2 days."
      />
    </>
  );
}
