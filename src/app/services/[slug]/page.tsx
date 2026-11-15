import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { FaqList } from "@/components/Faq";
import { KnockButton } from "@/components/KnockButton";
import { DoorOpenCta, ProcessRow } from "@/components/Blocks";
import { CAL_URL, SERVICE_ORDER, caseByName, getService, services } from "@/content/site";

export function generateStaticParams() {
  return SERVICE_ORDER.map((slug) => ({ slug }));
}


export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: `${s.tagline} ${s.intro}`.slice(0, 158).replace(/\s+\S*$/, "") + "…",
    alternates: { canonical: `/services/${slug}` },
  };
}

function ctaHref(label: string, title: string) {
  if (label === "Get a free automation audit") return "/contact?interest=ai-audit";
  if (label === "Get a fixed-price MVP estimate") return "/contact?interest=mvp-estimate";
  if (label.startsWith("Book")) return CAL_URL;
  return `/contact?interest=estimate&service=${encodeURIComponent(title)}`;
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const primaryHref = ctaHref(s.primaryCta, s.title);
  const estimateHref = `/contact?interest=estimate&service=${encodeURIComponent(s.title)}`;
  const others = services.filter((x) => x.slug !== slug);
  let ch = 1;
  const n = () => String(++ch).padStart(2, "0");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: "https://www.techknocklabs.com/services" },
      { "@type": "ListItem", position: 2, name: s.title, item: `https://www.techknocklabs.com/services/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="shell pb-16 pt-[calc(var(--nav-h)+72px)] md:pb-24 md:pt-[calc(var(--nav-h)+112px)]">
        <div className="hero-in grid gap-6 md:grid-cols-12 md:gap-8">
          <nav aria-label="Breadcrumb" className="label md:col-span-3 md:pt-4">
            <span className="text-bone">01</span> — <Link href="/services" className="link-quiet hover:text-bone">Services</Link>
          </nav>
          <div className="md:col-span-9">
            <h1 className="max-w-[14ch] text-[clamp(48px,7vw,112px)] font-medium leading-[0.98] tracking-[-0.04em] text-bone">{s.title}</h1>
            <p className="display-serif mt-6 max-w-[24ch] text-[clamp(30px,3.4vw,48px)] italic leading-[1.08] text-bone/90">{s.tagline}</p>
            <p className="mt-8 max-w-[60ch] text-[18px] text-muted">{s.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <KnockButton label={s.primaryCta} href={primaryHref} />
              <Link href="/contact" className="link-underline text-[15px] text-bone">Start a project</Link>
            </div>
            <ul className="label mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-hairline pt-6">
              <li><span className="text-bone">5.0</span> on Clutch</li>
              <li><span className="text-bone">{s.countStat}</span> {s.countLabel}</li>
              <li>Reply within <span className="text-bone">1 working day</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ov" className="border-t border-hairline">
        <div className="shell grid gap-10 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-3">
            <p className="label"><span className="text-bone">{n()}</span> — <span id="ov">Overview</span></p>
            <ul className="mt-8 flex flex-wrap gap-2 md:flex-col md:items-start">
              {s.stack.map((t) => (
                <li key={t} className="rounded-full border border-hairline px-3 py-1 font-mono text-[13px] text-bone/80">{t}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 md:col-span-8 md:col-start-5">
            {s.overview.map((p, i) => (
              <p key={i} className={i === 0 ? "text-[clamp(22px,2vw,28px)] leading-[1.4] tracking-[-0.01em] text-bone" : "max-w-[66ch] text-[17px] text-muted"}>{p}</p>
            ))}
            {s.tools?.length ? (
              <div className="border-t border-hairline pt-8">
                <h2 className="text-[20px] font-medium text-bone">{s.toolsHeading}</h2>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[17px] text-muted">
                  {s.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="cap" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="cap" n={n()} label="Capabilities" title="What we deliver." />
          <ol className="mt-16 grid border-t border-hairline md:grid-cols-2">
            {s.capabilities.map((c, i) => (
              <li key={c.title} className={`border-b border-hairline py-8 md:px-8 ${i % 2 === 0 ? "md:pl-0" : "md:border-l"}`}>
                <p className="label tabular">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[26px] font-medium tracking-[-0.02em] text-bone">{c.title}</h3>
                <p className="mt-3 max-w-[52ch] text-[16px] text-muted">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="aud" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="aud" n={n()} label="Who it's for" title="Built for teams like yours." />
          <ul className="mt-16 md:pl-[25%]">
            {s.audience.map((a) => (
              <li key={a} className="border-b border-hairline py-6 font-serif text-[clamp(30px,3.4vw,52px)] leading-[1.1] text-bone first:border-t">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="uc" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="uc" n={n()} label="Use cases" title="What we build with it." />
          <ol className="mt-16 border-t border-hairline">
            {s.useCases.map((u, i) => (
              <li key={u.title} className="grid gap-3 border-b border-hairline py-7 md:grid-cols-12 md:gap-8">
                <p className="label tabular md:col-span-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-[24px] font-medium tracking-[-0.02em] text-bone md:col-span-4">{u.title}</h3>
                <p className="max-w-[52ch] text-[16px] text-muted md:col-span-5">{u.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {s.mobile ? (
        <section aria-labelledby="mob" className="border-t border-hairline">
          <div className="shell grid gap-10 py-24 md:grid-cols-12 md:py-32">
            <div className="md:col-span-6">
              <p className="label"><span className="text-bone">{n()}</span> — Mobile apps</p>
              <h2 id="mob" className="mt-6 text-[clamp(36px,4.4vw,64px)] font-medium leading-[1.04] tracking-[-0.035em] text-bone">{s.mobile.heading}</h2>
              <p className="mt-6 max-w-[52ch] text-[17px] text-muted">{s.mobile.body}</p>
              <ul className="label mt-6 flex gap-4">{s.mobile.platforms.map((p) => <li key={p} className="rounded-full border border-hairline px-3 py-1 text-bone">{p}</li>)}</ul>
            </div>
            <div className="relative mx-auto aspect-[9/19] w-full max-w-[300px] overflow-hidden rounded-[36px] border border-hairline bg-surface md:col-span-4 md:col-start-8">
              <Image src="/portfolio/mobile/crossmypart.jpg" alt="CrossMyPart on mobile" fill sizes="300px" className="object-cover object-top" />
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="rel" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="rel" n={n()} label="Case studies" title="Related work." />
          <ul className="mt-16 grid gap-10 md:grid-cols-3">
            {s.related.map((r) => {
              const c = caseByName(r.name);
              return (
                <li key={r.name} className="group relative">
                  <div className="photo-zoom relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface">
                    {c?.image ? <Image src={c.image} alt={`${r.name} — ${r.industry}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /> : null}
                  </div>
                  <p className="label mt-5">{r.industry}</p>
                  <h3 className="display-serif mt-2 text-[44px] text-bone">
                    {c ? <Link href={`/work/${c.slug}`} className="after:absolute after:inset-0">{r.name}</Link> : r.name}
                  </h3>
                  <p className="mt-3 text-[15px] text-muted">{r.outcome}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="proc" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="proc" n={n()} label="How we work" title="From first call to launch, in four steps." />
          <div className="mt-16"><ProcessRow /></div>
        </div>
      </section>

      <section aria-labelledby="price" className="border-t border-hairline">
        <div className="shell py-24 md:py-32">
          <Chapter id="price" n={n()} label="Pricing & timeline" title="Clear scope. Clear price." />
          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            <dl className="grid gap-8 rounded-[14px] border border-hairline bg-surface p-8 md:p-10">
              <div><dt className="label">Best when</dt><dd className="mt-2 text-[18px] text-bone">{s.pricing.bestWhen}</dd></div>
              <div><dt className="label">Typical timeline</dt><dd className="mt-2 text-[18px] text-bone">{s.pricing.timeline}</dd></div>
              <div><dt className="label">From</dt><dd className="display-serif tabular mt-1 text-[72px] text-bone">{s.pricing.from}</dd></div>
              <div><Link href={estimateHref} className="link-underline text-[15px] text-bone">Get a fixed-price estimate</Link></div>
            </dl>
            {s.mvp ? (
              <div className="rounded-[14px] border border-hairline p-8 md:p-10">
                <p className="label">MVP package</p>
                <h3 className="mt-3 text-[28px] font-medium tracking-[-0.02em] text-bone">{s.mvp.heading}</h3>
                <ul className="mt-6 grid gap-2 text-[16px] text-bone/85 sm:grid-cols-2">
                  {s.mvp.items.map((it) => <li key={it} className="border-b border-hairline py-2">{it}</li>)}
                </ul>
                <dl className="mt-8 flex gap-12">
                  <div><dt className="label">Timeline</dt><dd className="mt-1 text-[18px] text-bone">{s.mvp.timeline}</dd></div>
                  <div><dt className="label">Starting at</dt><dd className="mt-1 text-[18px] text-bone">{s.mvp.from}</dd></div>
                </dl>
                <p className="mt-8"><Link href="/contact?interest=mvp-estimate" className="link-underline text-[15px] text-bone">{s.mvp.cta}</Link></p>
              </div>
            ) : (
              <figure className="flex flex-col justify-between rounded-[14px] border border-hairline p-8 md:p-10">
                <blockquote className="font-serif text-[clamp(26px,2.6vw,36px)] leading-[1.15] text-bone">
                  <span className="text-amber" aria-hidden="true">“</span>{s.testimonial.quote}<span className="text-amber" aria-hidden="true">”</span>
                </blockquote>
                <figcaption className="label mt-8"><span className="text-bone">{s.testimonial.name}</span> — {s.testimonial.role}</figcaption>
              </figure>
            )}
          </div>
          {s.mvp ? (
            <figure className="mt-16 md:pl-[25%]">
              <blockquote className="font-serif text-[clamp(30px,3.4vw,48px)] leading-[1.1] text-bone">
                <span className="text-amber" aria-hidden="true">“</span>{s.testimonial.quote}<span className="text-amber" aria-hidden="true">”</span>
              </blockquote>
              <figcaption className="label mt-6"><span className="text-bone">{s.testimonial.name}</span> — {s.testimonial.role}</figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="faq" className="border-t border-hairline">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-12">
            <Chapter id="faq" n={n()} label="FAQ" title={s.faqHeading} intro={<p>Still have a question? <Link href="/contact" className="link-underline text-bone">Talk to us</Link></p>} />
          </div>
          <div className="md:col-span-9 md:col-start-4"><FaqList items={s.faqs} /></div>
        </div>
      </section>

      <section aria-labelledby="more" className="border-t border-hairline">
        <div className="shell py-20">
          <p id="more" className="label">More services</p>
          <ul className="mt-6 border-t border-hairline">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-hairline">
                <Link href={`/services/${o.slug}`} className="flex min-h-[72px] items-center justify-between gap-6 py-4 text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-bone/85 transition-colors hover:text-bone">
                  <span>{o.title}</span>
                  <span className="label hidden md:inline">{o.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DoorOpenCta heading={s.cta.heading} body={s.cta.body} button={s.cta.button} buttonHref={ctaHref(s.cta.button, s.title)} />
    </>
  );
}
