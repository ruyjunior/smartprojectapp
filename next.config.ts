import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false, // antes: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yg4kjaovixlnxit1.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // ajuste conforme necessário
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors *' },
        ],
      },
    ];
  },
};

export default nextConfig;