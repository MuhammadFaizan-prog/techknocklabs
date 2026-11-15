"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CAL_URL } from "@/content/site";

const INTERESTS = [
  "AI Agents & Automation",
  "Custom AI Applications",
  "SaaS & Digital Products",
  "Web Applications",
  "Mobile Applications",
  "Enterprise Systems",
  "System Integrations",
  "Dedicated Engineers",
  "Not sure yet",
];
const BUDGETS = ["Under $5K", "$5K–20K", "$20K–50K", "$50K–100K", "$100K–300K", "$300K+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1–3 months", "3–6+ months", "Just exploring"];

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interests: string[];
  budget: string;
  timeline: string;
  message: string;
  website: string; // honeypot
};
type Field = "name" | "email" | "interests" | "budget" | "timeline" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name so we know who to reply to.";
  if (!v.email.trim()) e.email = "Enter your work email — that's where the reply goes.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look complete. Check for a missing @ or domain.";
  if (v.interests.length === 0) e.interests = "Pick at least one area, or choose “Not sure yet”.";
  if (!v.budget) e.budget = "Choose a budget range, or “Not sure yet”.";
  if (!v.timeline) e.timeline = "Choose a timeline, or “Just exploring”.";
  if (v.message.trim().length < 20) e.message = "Tell us a little more — a sentence or two about what you're building (20+ characters).";
  return e;
}

export function initialFromParams(params: URLSearchParams | null): Partial<Values> {
  if (!params) return {};
  const interest = params.get("interest");
  const service = params.get("service");
  switch (interest) {
    case "ai-audit":
      return { interests: ["AI Agents & Automation"], message: "I'd like a free AI automation audit." };
    case "cost-guide":
      return { message: "Please send me the Software Project Cost Guide." };
    case "mvp-estimate":
      return { interests: ["SaaS & Digital Products"], message: "I'd like a fixed-price MVP estimate." };
    case "reference":
      return { message: "I'd like to speak to a past client or see a deeper case study." };
    case "estimate": {
      const map: Record<string, string[]> = {
        "Web & Mobile Applications": ["Web Applications", "Mobile Applications"],
      };
      const picked = service ? map[service] ?? (INTERESTS.includes(service) ? [service] : []) : [];
      return { interests: picked, message: `I'd like a fixed-price estimate${service ? ` for ${service}` : ""}.` };
    }
    default:
      return {};
  }
}

export function ContactFormWithParams() {
  const params = useSearchParams();
  const init = initialFromParams(params);
  return <ContactForm key={params?.toString() ?? ""} initial={init} />;
}

export function ContactForm({ initial = {} }: { initial?: Partial<Values> }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    company: "",
    interests: [],
    budget: "",
    timeline: "",
    message: "",
    website: "",
    ...initial,
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const errors = validate(values);
  const show = (f: Field) => (touched[f] || submitted) && errors[f];

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setValues((v) => ({ ...v, [k]: val }));
  const blur = (f: Field) => setTouched((t) => ({ ...t, [f]: true }));
  const toggleInterest = (x: string) =>
    setValues((v) => ({ ...v, interests: v.interests.includes(x) ? v.interests.filter((i) => i !== x) : [...v.interests, x] }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    const first = (Object.keys(errs) as Field[])[0];
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return;
    }
    if (values.website) return; // honeypot filled: silently ignore
    setDone(true);
    requestAnimationFrame(() => doneRef.current?.focus());
  }

  const errCount = Object.keys(errors).length;

  if (done) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-[14px] border border-hairline bg-surface p-8 md:p-12">
        <p className="label"><span aria-hidden="true" className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-amber align-middle" />Details checked</p>
        <h3 className="display-serif mt-6 text-[clamp(44px,5vw,72px)] text-bone">Thanks, {values.name.split(" ")[0]}.</h3>
        <p className="mt-6 max-w-[56ch] text-[17px] text-bone/85">
          Your project details passed every check. This page is a portfolio redesign, so the form isn&apos;t connected to
          Techknock&apos;s inbox and <strong className="font-medium text-bone">nothing was sent</strong>. To reach the team, book a call or use the
          contact form on their live site.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a free strategy call<span className="sr-only"> (opens cal.com in a new tab)</span>
          </a>
          <button type="button" onClick={() => { setDone(false); setSubmitted(false); }} className="link-underline text-[15px] text-bone">
            Edit my details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={id("note")} className="space-y-12">
      <p id={id("note")} className="label">All fields are required unless marked optional.</p>

      {submitted && errCount > 0 ? (
        <div role="alert" className="rounded-[14px] border border-[#e07a5f]/50 p-5 text-[15px] text-bone">
          {errCount === 1 ? "One field needs attention" : `${errCount} fields need attention`} before we can check your details.
        </div>
      ) : null}

      {/* Honeypot (their form's "Website" field) — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <TextField id={id("name")} field="name" label="Name" autoComplete="name" value={values.name} onChange={(v) => set("name", v)} onBlur={() => blur("name")} error={show("name")} />
        <TextField id={id("email")} field="email" label="Work email" type="email" autoComplete="email" value={values.email} onChange={(v) => set("email", v)} onBlur={() => blur("email")} error={show("email")} />
        <TextField id={id("phone")} label="Phone No." optional type="tel" autoComplete="tel" value={values.phone} onChange={(v) => set("phone", v)} />
        <TextField id={id("company")} label="Company" optional autoComplete="organization" value={values.company} onChange={(v) => set("company", v)} />
      </div>

      <fieldset aria-describedby={show("interests") ? id("interests-err") : undefined}>
        <legend className="text-[17px] text-bone">What do you need help with? <span className="label ml-1">Select all that apply</span></legend>
        <div className="mt-5 flex flex-wrap gap-3">
          {INTERESTS.map((x, i) => (
            <span key={x} className="relative">
              <input
                type="checkbox"
                id={id(`int-${i}`)}
                className="chip-input"
                checked={values.interests.includes(x)}
                onChange={() => { toggleInterest(x); blur("interests"); }}
                {...(i === 0 ? { "data-field": "interests" } : {})}
              />
              <label htmlFor={id(`int-${i}`)} className="chip">{x}</label>
            </span>
          ))}
        </div>
        {show("interests") ? <p id={id("interests-err")} role="alert" className="mt-3 text-[14px] text-[#f0a48f]">{errors.interests}</p> : null}
      </fieldset>

      <RadioGroup name="budget" legend="Budget" options={BUDGETS} value={values.budget} onChange={(v) => { set("budget", v); blur("budget"); }} error={show("budget")} uid={id("budget")} />
      <RadioGroup name="timeline" legend="Timeline" options={TIMELINES} value={values.timeline} onChange={(v) => { set("timeline", v); blur("timeline"); }} error={show("timeline")} uid={id("timeline")} />

      <div>
        <label htmlFor={id("message")} className="text-[17px] text-bone">Tell us about your project</label>
        <textarea
          id={id("message")}
          data-field="message"
          rows={5}
          className="field mt-2 resize-y"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={show("message") ? true : undefined}
          aria-describedby={show("message") ? id("message-err") : undefined}
          placeholder="What are you building, who is it for, and what's the first milestone?"
        />
        {show("message") ? <p id={id("message-err")} role="alert" className="mt-2 text-[14px] text-[#f0a48f]">{errors.message}</p> : null}
      </div>

      <div className="flex flex-col gap-5 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[52ch] text-[14px] text-muted">
          Your details stay private. We&apos;re happy to sign an NDA before you share anything sensitive.
        </p>
        <button type="submit" className="btn btn-primary knock">
          <span className="ring" aria-hidden="true" />
          <span className="ring" aria-hidden="true" />
          <span className="ring" aria-hidden="true" />
          Send project details
        </button>
      </div>
      <p className="label">Portfolio demo: this form validates in your browser and does not send anything.</p>
    </form>
  );
}

function TextField({
  id, field, label, optional, type = "text", autoComplete, value, onChange, onBlur, error,
}: {
  id: string; field?: Field; label: string; optional?: boolean; type?: string; autoComplete?: string;
  value: string; onChange: (v: string) => void; onBlur?: () => void; error?: string | false;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[17px] text-bone">
        {label} {optional ? <span className="label ml-1">optional</span> : null}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className="field mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        {...(field ? { "data-field": field } : {})}
      />
      {error ? <p id={`${id}-err`} role="alert" className="mt-2 text-[14px] text-[#f0a48f]">{error}</p> : null}
    </div>
  );
}

function RadioGroup({
  name, legend, options, value, onChange, error, uid,
}: {
  name: string; legend: string; options: string[]; value: string; onChange: (v: string) => void; error?: string | false; uid: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${uid}-err` : undefined}>
      <legend className="text-[17px] text-bone">{legend}</legend>
      <div className="mt-5 flex flex-wrap gap-3">
        {options.map((o, i) => (
          <span key={o} className="relative">
            <input
              type="radio"
              id={`${uid}-${i}`}
              name={name}
              className="chip-input"
              checked={value === o}
              onChange={() => onChange(o)}
              {...(i === 0 ? { "data-field": name } : {})}
            />
            <label htmlFor={`${uid}-${i}`} className="chip">{o}</label>
          </span>
        ))}
      </div>
      {error ? <p id={`${uid}-err`} role="alert" className="mt-3 text-[14px] text-[#f0a48f]">{error}</p> : null}
    </fieldset>
  );
}
