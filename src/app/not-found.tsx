import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-[var(--nav-h)]">
      <p className="label"><span className="text-bone">404</span> — Page not found</p>
      <h1 className="mt-6 text-bone">
        <span className="block text-[clamp(44px,6vw,88px)] font-medium leading-none tracking-[-0.04em]">Nobody behind</span>
        <span className="display-serif block text-[clamp(72px,10vw,150px)] italic">this door.</span>
      </h1>
      <p className="mt-8 max-w-[52ch] text-[17px] text-muted">The page you knocked on doesn&apos;t exist or has moved. Try the home page or see our work.</p>
      <div className="mt-8 flex gap-8">
        <Link href="/" className="btn btn-primary">Go to the home page</Link>
        <Link href="/work" className="link-underline self-center text-[15px] text-bone">See our work</Link>
      </div>
    </section>
  );
}
