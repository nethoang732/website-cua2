import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@eurowindow/ui', '@eurowindow/types'],
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

export default nextConfig;
