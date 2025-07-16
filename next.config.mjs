/** @type {import('next').NextConfig} */
const nextConfig = {
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
