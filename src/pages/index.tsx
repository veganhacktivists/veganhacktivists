import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/decoration/hero';
import { LightButton } from '../components/decoration/buttons';
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
        <div className="relative text-white font-bold mx-auto md:w-1/2 drop-shadow-2xl text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nunc
          lectus
        </div>
        <div className="relative mx-auto mt-10">
          <LightButton href="/about">Learn More</LightButton>
        </div>
      </Hero>
      <div className="min-h-screen">Rest of the page</div>
    </>
  );
};

export default Home;
