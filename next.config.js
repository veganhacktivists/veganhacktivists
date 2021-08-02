module.exports = {
  reactStrictMode: true,
  images: {
    // TODO: Remove placekitten before merging advisors page
    domains: ['images.ctfassets.net', 'placekitten.com'],
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
