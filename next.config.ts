import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true, // disable image optimization if using CDN
  },
};

export default nextConfig;
