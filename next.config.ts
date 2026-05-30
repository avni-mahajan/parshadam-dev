import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['100.112.157.94'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'three', '@react-three/drei', '@react-three/fiber', 'framer-motion', 'gsap'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unatibharat.coop',
      }
    ],
  },
};

export default nextConfig;
