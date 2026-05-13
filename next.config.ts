import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // menghilangkan warning Turbopack di terminal (opsional)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
