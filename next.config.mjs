/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    return config;
  },
  i18n: {
    locales: ['default', 'en', 'ru'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.resolve('src/styles')],
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
