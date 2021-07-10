import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/decoration/hero';
import heroBackground from '../../public/images/VH-hero-bg.png';
import heroTagline from '../../public/images/VH-hero-tagline.png';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Vegan Hacktivists | Developers Coding for a Vegan World</title>
      </Head>
      <div className="text-7xl">
        We <code className="text-9xl">Code</code> for the{' '}
        <span className="font-italic">animals</span>
        <Hero imageBackground={heroBackground.src} alignment="right">
          <div className="m-32">
            <Image
              src={heroTagline.src}
              width={heroTagline.width}
              height={heroTagline.height}
              alt="Compassion, Creativity, Code"
            />
          </div>
        </Hero>
      </div>
    </>
  );
};

export default Home;
