import bundleAnalyzer from '@next/bundle-analyzer';
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: { properties: ['^data-testid$'] },
  },
  eslint: {
    ignoreDuringBuilds: process.env.CI === 'true',
  },
  experimental: {
    instrumentationHook: true,
  },
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'image.hm.com',
        pathname: '/**',
        protocol: 'https',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: process.env.CI === 'true',
  },
};

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withPWA(withBundleAnalyzer(nextConfig));
