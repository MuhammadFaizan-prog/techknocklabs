import { NextResponse, type NextRequest } from "next/server";
import { SLUGS } from "@/content/slugs";

// With Cache Components the page shell streams with 200 before notFound() runs,
// so unknown slugs are rejected here to return a real 404 (per Next 16 docs).
export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const known = SLUGS[section];
  if (known && slug && (rest.length > 0 || !known.includes(slug))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/services/:slug+", "/work/:slug+", "/blog/:slug+"],
};
