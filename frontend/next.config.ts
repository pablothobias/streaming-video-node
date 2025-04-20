import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      hostname: 'pbs.twimg.com',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '8080',
    },
  ]
}
};

export default nextConfig;
