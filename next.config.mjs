/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.annihil.us'],
  },

  webpack: (config, { isServer }) => {
    const isProd = process.env.NODE_ENV === 'production';

    config.optimization = {
      ...config.optimization,
      concatenateModules: isProd,
      minimize: isProd,
    };

    return config;
  },
};

export default nextConfig;