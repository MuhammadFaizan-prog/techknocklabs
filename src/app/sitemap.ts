import type { MetadataRoute } from "next";
import { SERVICE_ORDER, SITE_URL, caseStudies, posts } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/services", "/work", "/about", "/blog", "/contact",
    ...SERVICE_ORDER.map((s) => `/services/${s}`),
    ...caseStudies.map((c) => `/work/${c.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}` }));
}
