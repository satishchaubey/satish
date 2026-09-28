import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true, // disable image optimization if using CDN
  },
  env: {
    NVIDIA_API_KEY: "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",
  },
};

export default nextConfig;
