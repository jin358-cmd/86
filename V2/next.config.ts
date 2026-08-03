import type { NextConfig } from "next";

const repoName = "86";
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Always export static files so previews/Pages can host without a Node server.
  output: "export",
  trailingSlash: true,
  basePath: isPages ? `/${repoName}` : undefined,
  assetPrefix: isPages ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
};

export default nextConfig;
