import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = () => ({
  redirect: {
    destination: '/about/our-mission',
    permanent: true,
  },
});

const About: React.FC = () => {
  return null;
};

export default About;
