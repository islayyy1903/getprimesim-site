import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Only redirect HTTP to HTTPS in production
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http',
            },
          ],
          destination: 'https://getprimesim.com/:path*',
          permanent: true,
        },
      ];
    }
    return [];
  },
  // Cache bypass için headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
