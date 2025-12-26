import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.shopify.com' },
      { hostname: 'i.ytimg.com' },
    ],
  },
}

export default nextConfig
