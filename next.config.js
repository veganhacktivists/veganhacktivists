const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' && {
      exclude: ['error', 'info', 'warn'],
    },
  },
  i18n: {
    locales: ['en' /**, 'de', 'zh', 'dev' */],
    defaultLocale: 'en',

    // disable localeDetection to avoid automatic redirects until the translation feature is fully integrated
    localeDetection: false,
  },
  redirects() {
    return [
      {
        source: '/research',
        destination: '/tech-and-data-in-the-movement.pdf',
        permanent: false,
      },
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
        source: '/year-in-review',
        destination: '/year-in-review/2023',
        permanent: false,
      },
      {
        source: '/joinplayground',
        destination: 'https://discord.gg/vhplayground',
        permanent: false,
      },
      {
        source: '/apply',
        destination: '/join',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
