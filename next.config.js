/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  optimizeFonts: false, // Disable automatic font optimization since we're using local fonts
  webpack: (config, { dev, isServer }) => {
    // Disable cache in development to prevent cache-related errors
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;