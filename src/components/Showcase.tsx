import type { CSSProperties } from "react";
import { processSteps, serviceOverview } from "@/content/site";

/** Self-playing UI proofs. Purely visual loops built only from official copy
 *  (step names/times, service tags). Decorative: aria-hidden; the same text
 *  appears in readable form elsewhere on the page. Static under reduced motion. */

export function ProcessShowcase() {
  return (
    <div aria-hidden="true" className="sim glass rounded-[14px] p-5">
      <div className="flex items-center justify-between">
        <p className="label text-[12px]">How we work</p>
        <span className="pulse-dot" />
      </div>
      <ol className="mt-5 space-y-3">
        {processSteps.map((s, i) => (
          <li key={s.title} className="sim-step flex items-center gap-3" style={{ "--n": i } as CSSProperties}>
            <span className="sim-node" />
            <span className="text-[15px] text-bone">{s.title}</span>
            <span className="label ml-auto text-[12px]">{s.time}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 h-px w-full overflow-hidden bg-hairline">
        <div className="sim-bar h-full w-full bg-amber" />
      </div>
    </div>
  );
}

export function AgentLog({ slug = "ai-agents" }: { slug?: string }) {
  const tags = serviceOverview[slug].tags;
  return (
    <div aria-hidden="true" className="sim glass rounded-[12px] p-4 font-mono text-[12.5px]">
      <div className="flex items-center gap-2 border-b border-hairline pb-3">
        <span className="pulse-dot" />
        <span className="text-muted">{slug}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {tags.map((t, i) => (
          <li key={t} className="sim-line flex items-center gap-2" style={{ "--n": i } as CSSProperties}>
            <span className="text-amber">▸</span>
            <span className="text-bone/85">{t}</span>
            <span className="sim-ok ml-auto h-[6px] w-[6px] rounded-full bg-amber" />
          </li>
        ))}
      </ul>
      <div className="mt-4 h-px w-full overflow-hidden bg-hairline">
        <div className="sim-bar sim-bar-log h-full w-full bg-amber" />
      </div>
    </div>
  );
}
