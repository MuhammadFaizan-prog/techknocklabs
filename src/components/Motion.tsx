import type { CSSProperties } from "react";

/** Masked word reveal. Screen readers get the sentence once (sr-only);
 *  the animated words are aria-hidden. Triggered by RevealObserver (`data-split`). */
export function SplitWords({ text, variant }: { text: string; variant?: "h" }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-split={variant ?? ""}>
        {words.map((w, i) => (
          <span key={i}>
            <span className="split-w">
              <span style={{ "--i": Math.min(i, 40) } as CSSProperties}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}
