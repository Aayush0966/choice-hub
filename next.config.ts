import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'img.icons8.com'
      }
    ]
  }
};

export default nextConfig;
