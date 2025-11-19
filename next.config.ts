import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'randomuser.me',
      },
      {
        hostname: 'i.ibb.co',
      },
      {
        hostname: 'i.ibb.co.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
