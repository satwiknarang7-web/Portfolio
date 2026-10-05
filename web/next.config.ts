import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's multi-service deployments don't expose the /_next/image optimizer
    // (it returns 404), so images are served as-is. Every image in /public is
    // already pre-optimized WebP/JPEG at its display size.
    unoptimized: true,
  },
};

export default nextConfig;
