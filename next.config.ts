import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/vereinswebsite",
  assetPrefix: "/vereinswebsite/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
