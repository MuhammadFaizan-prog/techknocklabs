import type { Faq as FaqT } from "@/content/site";

export function FaqList({ items }: { items: FaqT[] }) {
  return (
    <div className="border-t border-hairline">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-hairline">
          <summary className="flex min-h-[72px] items-center justify-between gap-6 py-5 text-[19px] text-bone transition-colors hover:text-white md:text-[22px]">
            <span>{f.q}</span>
            <svg className="faq-icon h-5 w-5 flex-none text-muted group-open:text-amber" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </summary>
          <p className="max-w-[68ch] pb-7 text-[16px] text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
