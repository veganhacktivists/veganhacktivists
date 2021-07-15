import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const About: React.FC = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/about/our-mission', {}, { shallow: true });
  }, []);
  return <></>;
};

export default About;
