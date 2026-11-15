import type { NextConfig } from "next";

// Tailwind v4 runs through PostCSS (postcss.config.mjs). The scaffold's
// turbopack "@tailwindcss/turbopack" loader rule was removed: that package is
// not installed and is not needed.
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
