import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE_URL } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Techknock Labs — Software development & AI solutions",
    template: "%s — Techknock Labs",
  },
  description:
    "Techknock Labs designs, builds and supports software and AI systems for startups and growing businesses: AI agents, custom AI apps, SaaS, web and mobile.",
  applicationName: "Techknock Labs",
  icons: { icon: "/img/icon.png" },
  openGraph: {
    type: "website",
    siteName: "Techknock Labs",
    images: [{ url: "/img/door-ajar.webp", width: 1584, height: 672, alt: "A black door ajar with a slit of amber light on a dark floor" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Techknock Labs",
  legalName: "Techknock Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo-mark-blue.png`,
  foundingDate: "2021",
  founder: { "@type": "Person", name: "Ahmed Khan" },
  address: [
    { "@type": "PostalAddress", streetAddress: "228 Park Ave S", addressLocality: "New York", addressRegion: "NY", postalCode: "10003", addressCountry: "US" },
    { "@type": "PostalAddress", streetAddress: "215a 650 Avebury Boulevard", addressLocality: "Milton Keynes", postalCode: "MK9 3FQ", addressCountry: "GB" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body className="flex min-h-svh flex-col">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <a href="#main" className="sr-only z-[60] rounded-full bg-bone px-5 py-3 text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-3">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
