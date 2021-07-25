module.exports = {
  reactStrictMode: true,
  images: {
    domains: [],
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
