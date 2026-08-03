import type { NextConfig } from "next";

/** Set by CI, e.g. `/86/v1` or `/86/v2`. Empty for local `npm run dev`. */
const pagesBase = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: pagesBase || undefined,
  assetPrefix: pagesBase ? `${pagesBase}/` : undefined,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
};

export default nextConfig;
