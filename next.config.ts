import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep build artifacts separate from a stale OneDrive-synced cache.
  distDir: ".next-build",
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
