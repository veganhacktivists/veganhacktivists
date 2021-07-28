module.exports = {
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
        source: '/people',
        destination: '/people/team',
        permanent: true,
      },
    ];
  },
};
