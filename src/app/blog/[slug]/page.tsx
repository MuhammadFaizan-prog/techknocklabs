import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogCards, DoorOpenCta } from "@/components/Blocks";
import { SITE_URL, coverFor, getPost, posts } from "@/content/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}


export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title.length > 60 ? { absolute: p.title } : p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", publishedTime: p.iso },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.iso,
    author: { "@type": "Organization", name: "Techknock Labs" },
    publisher: { "@type": "Organization", name: "Techknock Labs" },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="shell pb-24 pt-[calc(var(--nav-h)+72px)] md:pt-[calc(var(--nav-h)+112px)]">
        <header className="hero-in grid gap-6 md:grid-cols-12 md:gap-8">
          <nav aria-label="Breadcrumb" className="label md:col-span-3 md:pt-4">
            <Link href="/blog" className="link-quiet hover:text-bone">Blog</Link> <span aria-hidden="true">/</span> <span className="text-bone">{p.category}</span>
          </nav>
          <div className="md:col-span-9">
            <h1 className="display-serif max-w-[20ch] text-[clamp(48px,6vw,96px)] leading-[1] text-bone">{p.title}</h1>
            <p className="mt-6 max-w-[60ch] text-[19px] text-muted">{p.excerpt}</p>
            <p className="label mt-6">
              <time dateTime={p.iso}>{p.date}</time> <span aria-hidden="true">/</span> {p.readTime} <span aria-hidden="true">/</span> Techknock Labs
            </p>
          </div>
        </header>
        <div data-wipe className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[14px] border border-hairline bg-surface md:aspect-[21/9]">
          <Image src={coverFor(p.category)} alt="" fill priority sizes="(min-width: 1440px) 1340px, 100vw" className="object-cover" />
        </div>
        <div className="mt-16 border-t border-hairline pt-14 md:grid md:grid-cols-12 md:gap-8">
          <div className="prose-door max-w-[68ch] md:col-span-8 md:col-start-4" dangerouslySetInnerHTML={{ __html: p.html }} />
        </div>
      </article>
      <section aria-labelledby="more" className="border-t border-hairline">
        <div className="shell py-20">
          <h2 id="more" className="text-[32px] font-medium tracking-[-0.02em] text-bone">More from the blog</h2>
          <div className="mt-10"><BlogCards items={more} /></div>
        </div>
      </section>
      <DoorOpenCta
        heading="Let's build what's next."
        body="Tell us what you're building. We'll reply within one working day with honest advice, even if we're not the right fit."
      />
    </>
  );
}
