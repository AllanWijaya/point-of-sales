import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  allowedDevOrigins: ["192.168.1.11"],
  devIndicators: false,
};

export default nextConfig;
