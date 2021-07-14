import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const About: React.FC = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/about/our-mission');
  }, []);
  return <></>;
};

export default About;
