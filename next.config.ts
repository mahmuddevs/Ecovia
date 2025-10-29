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
};

export default nextConfig;
