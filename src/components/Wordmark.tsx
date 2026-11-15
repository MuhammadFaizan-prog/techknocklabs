import Image from "next/image";
import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Techknock Labs, home">
      <Image src="/img/logo-mark-blue.png" alt="" width={26} height={18} className="h-[18px] w-auto opacity-90 grayscale brightness-[2.2]" priority />
      <span className="text-[15px] font-medium tracking-[-0.01em] text-bone">Techknock Labs</span>
    </Link>
  );
}
