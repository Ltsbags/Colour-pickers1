import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  serverExternalPackages: [
    '@opentelemetry/api',
    '@opentelemetry/core',
    '@opentelemetry/semantic-conventions',
    '@google/genai',
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['motion'],
};

export default nextConfig;
