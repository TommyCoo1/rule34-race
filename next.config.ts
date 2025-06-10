import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-cdn.rule34.xxx",
      },
      {
        protocol: "https",
        hostname: "rule34.xxx",
      },
      {
        protocol: "https",
        hostname: "api-cdn-mp4.rule34.xxx",
      },
    ],
  },
};

export default nextConfig;
