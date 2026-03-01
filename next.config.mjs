/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config
  },
  experimental: {
    // App Router tetap aktif
    appDir: true,
  },
  // Paksa gunakan Webpack, bukan Turbopack
  webpack: (config, { isServer }) => {
    return config;
  },
};
export default nextConfig;
