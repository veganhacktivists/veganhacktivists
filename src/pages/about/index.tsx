import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/about/our-mission',
    permanent: true,
  },
});

const About: React.FC = () => {
  return null;
};

export default About;
