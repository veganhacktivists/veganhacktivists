import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import heroBackground from '../../public/images/VH-hero-bg.png';
import heroTagline from '../../public/images/VH-hero-tagline.png';
import { DarkButton, LightButton } from '../components/decoration/buttons';
import Hero from '../components/decoration/hero';

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
        <div className="relative text-white mx-auto md:w-1/2 drop-shadow-2xl text-2xl">
          Fighting for the animal rights movement since 2019.
        </div>
        <div className="relative mx-auto mt-10">
          <LightButton href="/about">Learn More</LightButton>
        </div>
      </Hero>
      <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl">
        <p>
          We&apos;re a group of passionate Vegan Activists that volunteer our
          time and skills towards <b>vegan projects worth supporting.</b> Every
          project we work on aims to help spread compassion through Veganism by
          supporting both vegans, non-vegans and activists in some way.
        </p>
        <br />
        <p>
          Every project we release is <b>100% free to use for everyone.</b> We
          don&apos;t do premium versions, microtransactions, advertisements, or
          sell user data - ever.
        </p>
        <br />
        <p>
          <b>We do this for the animals</b> - we do this because coding is our
          way of doing our part for activism. If you want to support us, please
          consider a small donation via our{' '}
          <span className="text-pink">Patreon!</span> It means the world to us
          and the animals to have your support.
        </p>
        <div className="relative mx-auto mt-10 md:w-1/3">
          <DarkButton href="/mission">Our Mission</DarkButton>
        </div>
      </div>
      <div className="min-h-screen">Rest of the page</div>
    </>
  );
};

export default Home;
