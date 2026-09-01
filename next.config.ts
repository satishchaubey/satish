import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true, // disable image optimization if using CDN
  },
};

export default nextConfig;
