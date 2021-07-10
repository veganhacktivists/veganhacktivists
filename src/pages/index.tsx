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
      <Hero imageBackground={heroBackground.src} alignment="right">
        <div>
          <Image
            src={heroTagline.src}
            width={heroTagline.width}
            height={heroTagline.height}
            alt="Compassion, Creativity, Code"
          />
        </div>
      </Hero>
      <div className="min-h-screen">Rest of the page</div>
    </>
  );
};

export default Home;
