import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Set in GitHub Actions only — Vercel uses site root */
const basePath = process.env.GITHUB_PAGES === "true" ? "/OAPEC-proposal" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      "@react-pdf/renderer": "@react-pdf/renderer/lib/react-pdf.browser.js",
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@react-pdf/renderer": "@react-pdf/renderer/lib/react-pdf.browser.js",
      };
    }
    return config;
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
