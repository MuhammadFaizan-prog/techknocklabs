import { CAL_URL } from "@/content/site";

export function KnockButton({ label = "Book a free strategy call", href = CAL_URL, className = "" }: { label?: string; href?: string; className?: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn btn-primary knock ${className}`}
    >
      <span className="ring" aria-hidden="true" />
      <span className="ring" aria-hidden="true" />
      <span className="ring" aria-hidden="true" />
      <span className="sweep" aria-hidden="true" />
      {label}
      {external ? <span className="sr-only"> (opens cal.com in a new tab)</span> : null}
    </a>
  );
}
