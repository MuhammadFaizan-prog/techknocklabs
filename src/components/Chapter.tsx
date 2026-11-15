import type { ReactNode } from "react";

/** Numbered chapter header — the site's wayfinding device (pinned by the brief). */
export function Chapter({
  n,
  label,
  title,
  intro,
  id,
  as: Tag = "h2",
  aside,
}: {
  n: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  aside?: ReactNode;
}) {
  return (
    <header data-reveal className="grid gap-6 md:grid-cols-12 md:gap-8">
      <p className="label md:col-span-3 md:pt-3">
        <span className="tabular text-bone">{n}</span> — {label}
      </p>
      <div className="md:col-span-9">
        <Tag id={id} className="max-w-[18ch] text-[clamp(40px,5.4vw,80px)] font-medium leading-[1.02] tracking-[-0.035em] text-bone">
          {title}
        </Tag>
        {intro ? <div className="mt-6 max-w-[62ch] text-[17px] text-muted">{intro}</div> : null}
        {aside}
      </div>
    </header>
  );
}
