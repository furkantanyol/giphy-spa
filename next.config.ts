import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.giphy.com',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
