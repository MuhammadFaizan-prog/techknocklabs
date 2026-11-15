import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { DoorOpenCta } from "@/components/Blocks";
import { caseStudies, getCase } from "@/content/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}


export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.name} case study`,
    description: c.card.summary.length > 160 ? c.card.summary.slice(0, 157).replace(/\s+\S*$/, "") + "…" : c.card.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: c.image ? { images: [{ url: c.image, width: 1280, height: 800, alt: c.name }] } : undefined,
  };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const meta: [string, React.ReactNode][] = [
    ["Industry", c.industry],
    ["Platform", c.platform],
    ["Services", c.services],
    ["Stack", c.stack],
  ];
  if (c.liveUrl && c.site) {
    meta.push([
      "Website",
      <a key="site" href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
        {c.site}<span className="sr-only"> (opens in a new tab)</span>
      </a>,
    ]);
  }

  return (
    <>
      <article>
        <header className="shell pb-14 pt-[calc(var(--nav-h)+72px)] md:pt-[calc(var(--nav-h)+112px)]">
          <div className="hero-in grid gap-6 md:grid-cols-12 md:gap-8">
            <nav aria-label="Breadcrumb" className="label md:col-span-3 md:pt-6">
              <Link href="/work" className="link-quiet hover:text-bone">Work</Link> <span aria-hidden="true">/</span> <span className="text-bone">{c.card.category}</span>
            </nav>
            <div className="md:col-span-9">
              <h1 className="display-serif text-[clamp(72px,11vw,176px)] text-bone">{c.name}</h1>
              <p className="mt-6 max-w-[30ch] text-[clamp(22px,2.2vw,30px)] leading-[1.3] tracking-[-0.01em] text-bone/90">{c.tagline}</p>
            </div>
          </div>
          <dl className="mt-14 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-5">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd className="mt-2 text-[15px] text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {c.image ? (
          <div className="shell">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface">
              <Image src={c.image} alt={`${c.name} product screens`} fill priority sizes="(min-width: 1440px) 1344px, 100vw" className="object-cover" />
            </div>
          </div>
        ) : null}

        <section aria-labelledby="about" className="shell grid gap-10 py-24 md:grid-cols-12 md:py-32">
          <p className="label md:col-span-3"><span className="text-bone">01</span> — <span id="about">About</span></p>
          <div className="space-y-6 md:col-span-8 md:col-start-5">
            {c.about.map((p, i) => (
              <p key={i} className={i === 0 ? "text-[clamp(22px,2vw,28px)] leading-[1.4] tracking-[-0.01em] text-bone" : "max-w-[66ch] text-[17px] text-muted"}>{p}</p>
            ))}
            {c.liveUrl ? (
              <p>
                <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-[15px] text-bone">
                  Visit live product<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            ) : null}
          </div>
        </section>

        <section aria-labelledby="chal" className="border-t border-hairline">
          <div className="shell py-24 md:py-32">
            <Chapter id="chal" n="02" label="The problem" title="Challenge" />
            <ul className="mt-16 border-t border-hairline md:ml-[25%]">
              {c.challenge.map((x) => <li key={x} className="border-b border-hairline py-6 text-[19px] text-bone/90">{x}</li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="tl" className="border-t border-hairline">
          <div className="shell py-24 md:py-32">
            <Chapter id="tl" n="03" label="Phases" title="Timeline" />
            <ol className="mt-16 grid border-t border-hairline md:grid-cols-2 lg:grid-cols-4">
              {c.timeline.map((t, i) => (
                <li key={t.phase} className={`flex flex-col border-b border-hairline py-8 md:px-6 lg:border-b-0 ${i > 0 ? "lg:border-l" : "md:pl-0"} ${i % 2 === 1 ? "md:border-l" : ""}`}>
                  <p className="label tabular">{t.n}</p>
                  <h3 className="mt-8 font-serif text-[36px] leading-none text-bone">{t.phase}</h3>
                  <p className="mt-4 text-[15px] text-muted">{t.body}</p>
                  <p className="label mt-6 text-bone md:mt-auto md:pt-8">
                    <span aria-hidden="true" className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-amber align-middle" />{t.duration}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="ap" className="border-t border-hairline">
          <div className="shell grid gap-16 py-24 md:grid-cols-2 md:py-32">
            <div>
              <p className="label"><span className="text-bone">04</span> — How</p>
              <h2 id="ap" className="mt-6 text-[clamp(32px,3.4vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-bone">Our approach</h2>
              <ul className="mt-10 border-t border-hairline">
                {c.approach.map((x) => <li key={x} className="border-b border-hairline py-5 text-[16px] text-bone/85">{x}</li>)}
              </ul>
            </div>
            <div>
              <p className="label"><span className="text-bone">05</span> — What</p>
              <h2 className="mt-6 text-[clamp(32px,3.4vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-bone">Key features</h2>
              <dl className="mt-10 border-t border-hairline">
                {c.features.map((f) => (
                  <div key={f.title} className="border-b border-hairline py-5">
                    <dt className="text-[18px] font-medium text-bone">{f.title}</dt>
                    <dd className="mt-1 text-[15px] text-muted">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="res" className="border-t border-hairline">
          <div className="shell grid gap-10 py-24 md:grid-cols-12 md:py-32">
            <div className="md:col-span-3">
              <p className="label"><span className="text-bone">06</span> — <span id="res">Results</span></p>
              <p className="label mt-10">Tech stack</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.techStack.map((t) => <li key={t} className="rounded-full border border-hairline px-3 py-1 font-mono text-[13px] text-bone/80">{t}</li>)}
              </ul>
            </div>
            <ol className="md:col-span-9">
              {c.results.map((r) => (
                <li key={r} className="border-b border-hairline py-6 font-serif text-[clamp(28px,3vw,44px)] leading-[1.12] text-bone first:border-t">{r}</li>
              ))}
            </ol>
          </div>
        </section>
      </article>

      <nav aria-label="Next case study" className="border-t border-hairline">
        <Link href={`/work/${next.slug}`} className="group shell flex flex-col gap-3 py-16 md:flex-row md:items-end md:justify-between">
          <span className="label">Next case study</span>
          <span className="display-serif text-[clamp(56px,8vw,128px)] text-bone/80 transition-colors group-hover:text-bone">{next.name}</span>
        </Link>
      </nav>

      <DoorOpenCta
        heading="Want results like these?"
        body="Tell us what you're building. We'll show you relevant work and give you a clear estimate within 1-2 days."
      />
    </>
  );
}
