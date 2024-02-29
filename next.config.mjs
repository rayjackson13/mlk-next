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
  sassOptions: {
    includePaths: [path.resolve('src/styles')],
  },
};

export default nextConfig;
