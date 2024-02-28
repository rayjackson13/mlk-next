/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
  sassOptions: {
    includePaths: [path.resolve('src/styles')],
  },
};

export default nextConfig;
