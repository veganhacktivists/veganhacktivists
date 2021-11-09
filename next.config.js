/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about/our-mission',
        permanent: true,
      },
      {
        source: '/challenge',
        destination:
          'https://gist.github.com/GRardB/7e2990bbea8c2e50e2b501b712d8c169',
        permanent: false,
      },
      {
        source: '/people',
        destination: '/people/team',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/people/team',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/docs/general/introduction',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
});
