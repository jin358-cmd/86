import type { NextConfig } from "next";

const repoName = "86";
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? `/${repoName}` : undefined,
  assetPrefix: isPages ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
};

export default nextConfig;
