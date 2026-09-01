import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    unoptimized: true, // disable image optimization if using CDN
  },
};

export default nextConfig;
