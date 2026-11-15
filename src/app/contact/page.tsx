import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Chapter } from "@/components/Chapter";
import { FaqList } from "@/components/Faq";
import { KnockButton } from "@/components/KnockButton";
import { CAL_URL, contactFaqs, offices } from "@/content/site";
import { ContactForm, ContactFormWithParams } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact: tell us what you're building",
  description:
    "Send Techknock Labs your project details or book a free 30-minute call. A senior engineer replies within one working day, and the first consultation is free.",
  alternates: { canonical: "/contact" },
};

const steps = [
  { n: "1", title: "We reply", body: "A senior engineer reviews your message and replies within one working day." },
  { n: "2", title: "Free call", body: "A 30-minute call to understand your goals, users and constraints. No sales pitch." },
  { n: "3", title: "Proposal", body: "A written proposal with scope, timeline and a fixed price within 1-2 days." },
];

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-12 pt-[calc(var(--nav-h)+72px)] md:pt-[calc(var(--nav-h)+112px)]">
        <div className="hero-in grid gap-6 md:grid-cols-12 md:gap-8">
          <p className="label md:col-span-3 md:pt-4"><span className="text-bone">01</span> — Contact</p>
          <div className="md:col-span-9">
            <h1 className="text-bone">
              <span className="block text-[clamp(48px,6.4vw,100px)] font-medium leading-[1] tracking-[-0.04em]">Tell us what</span>
              <span className="display-serif block text-[clamp(72px,10vw,160px)] italic">you&apos;re building.</span>
            </h1>
            <p className="mt-8 max-w-[56ch] text-[18px] text-muted">
              You&apos;ll hear back from a senior engineer within one working day, and the first consultation is free.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="form-h" className="border-t border-hairline">
        <div className="shell grid gap-14 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-3">
            <p className="label"><span className="text-bone">02</span> — Project details</p>
            <h2 id="form-h" className="mt-6 text-[30px] font-medium leading-[1.1] tracking-[-0.02em] text-bone">Send us your project details</h2>
          </div>
          <div className="relative md:col-span-9">
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="talk" className="border-t border-hairline">
        <div className="shell grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-28">
          <div className="md:col-span-8">
            <Chapter id="talk" n="03" label="Prefer to talk" title="Prefer to talk directly?" intro={<p>Pick a time for a free 30-minute call.</p>} />
          </div>
          <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
            <KnockButton />
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-[14px] text-muted">
              Opens cal.com/techknock/30min in a new tab
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="next" className="border-t border-hairline">
        <div className="shell py-20 md:py-28">
          <Chapter id="next" n="04" label="After you get in touch" title="What happens next" />
          <ol className="mt-14 grid border-t border-hairline md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.n} className={`border-b border-hairline py-8 md:border-b-0 md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l"}`}>
                <p className="display-serif tabular text-[88px] text-bone">{s.n}</p>
                <h3 className="mt-4 text-[24px] font-medium tracking-[-0.02em] text-bone">{s.title}</h3>
                <p className="mt-3 max-w-[36ch] text-[15px] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-16 grid gap-8 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="label">Email</dt><dd className="mt-2 text-[15px] text-bone">Send your details with the form above, or book a call.</dd></div>
            <div><dt className="label">Hours</dt><dd className="mt-2 text-[15px] text-bone">Monday–Friday, UK and US business hours</dd></div>
            <div><dt className="label">Response time</dt><dd className="mt-2 text-[15px] text-bone">Within one working day</dd></div>
            <div>
              <dt className="label">Offices</dt>
              <dd className="mt-2 space-y-2 text-[15px] text-bone">
                {offices.slice(0, 2).map((o) => <address key={o.code} className="not-italic">{o.address}</address>)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="faq" className="border-t border-hairline">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-12">
            <Chapter id="faq" n="05" label="FAQ" title="Questions, answered." intro={<p>Still have a question? <Link href="#form-h" className="link-underline text-bone">Talk to us</Link></p>} />
          </div>
          <div className="md:col-span-9 md:col-start-4"><FaqList items={contactFaqs} /></div>
        </div>
      </section>
    </>
  );
}
