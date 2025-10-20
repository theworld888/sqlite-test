import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ✅ 忽略 eslint 报错
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
