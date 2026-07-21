import path from "node:path";
import type { NextConfig } from "next";

// Vercel requires the standard Next.js `.next` output directory.
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingIncludes: {
    "/api/assistant": ["./knowledge/**/*.md"],
  },
};

export default nextConfig;
