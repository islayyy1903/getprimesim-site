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
};

export default nextConfig;
