import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import activistHub from '../../public/images/ActivistHub.png';
import animalRebellion from '../../public/images/AnimalRebellion.png';
import animalRightsMap from '../../public/images/AnimalRightsMap.png';
import dailyDozen from '../../public/images/DailyDozen.png';
import dailyNooch from '../../public/images/DailyNooch.png';
import sehati from '../../public/images/Sehati.png';
import veganBootcamp from '../../public/images/VeganBootcamp.png';
import veganCheatSheet from '../../public/images/VeganCheatSheet.jpeg';
import heroBackground from '../../public/images/VH-hero-bg.png';
import heroTagline from '../../public/images/VH-hero-tagline.png';
import pixelHeart from '../../public/images/VH_PixelHeart.png';
import { DarkButton, LightButton } from '../components/decoration/buttons';
import Hero from '../components/decoration/hero';
import SquareField from '../components/decoration/squares/square_field';

const HERO_DECORATION_SQUARES = [
  { color: 'green', size: 32, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, bottom: 0 },
  { color: 'white', size: 16, right: 64, bottom: 0 },
  { color: 'magenta', size: 32, right: 0, bottom: 0 },
  { color: 'yellow', size: 32, left: 32, top: 0 },
  { color: 'yellow_orange', size: 16, left: 16, top: 32 },
  { color: 'red', size: 32, right: 32, top: 0 },
];

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Vegan Hacktivists | Developers Coding for a Vegan World</title>
      </Head>
      <Hero
        imageBackground={heroBackground.src}
        alignment="right"
        classNameMapping={{
          container: 'bg-center',
        }}
      >
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
      <SquareField squares={HERO_DECORATION_SQUARES} />
      <div className="content-center mx-auto my-32 md:w-1/2 drop-shadow-2xl text-2xl">
        <Image
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Compassion, Creativity, Code"
        />
        <p className="mb-16">
          <span className="italic text-3xl">We are </span>
          <b className="text-4xl">VEGAN HACKTIVISTS</b>
        </p>
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
      <div className="bg-grey-light">
        <div className="content-center mx-auto my-32 md:w-1/2 drop-shadow-2xl text-2xl">
          <br />
          <br />
          <p>
            <span className="italic text-3xl">Featured </span>
            <b className="text-4xl">PROJECTS</b>
          </p>
          <br />
          <br />
          <div className="grid md:grid-cols-4 md:gap-2 sm:grid-cols-2 sm:gap-2">
            <div>
              <a href="https://activisthub.org">
                <Image
                  src={activistHub.src}
                  width={activistHub.width}
                  height={activistHub.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
              <p>Activist Hub</p>
            </div>
            <div>
              <a href="https://animalrebellion.org">
                <Image
                  src={animalRebellion.src}
                  width={animalRebellion.width}
                  height={animalRebellion.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
              <p>Animal Rebellion</p>
            </div>
            <div>
              <Image
                src={animalRightsMap.src}
                width={animalRightsMap.width}
                height={animalRightsMap.height}
                alt="Compassion, Creativity, Code"
              />
              <p>Animal Rights Map</p>
            </div>
            <div>
              <a href="https://animalrightsmap.org">
                <Image
                  src={dailyDozen.src}
                  width={dailyDozen.width}
                  height={dailyDozen.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
              <p>Daily Dozen</p>
            </div>
            <div>
              <a href="https://dailynooch.org">
                <Image
                  src={dailyNooch.src}
                  width={dailyNooch.width}
                  height={dailyNooch.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
              <p>Daily Nooch</p>
            </div>
            <div>
              <a href="https://www.sehatianimalsanctuary.org">
                <Image
                  src={sehati.src}
                  width={sehati.width}
                  height={sehati.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
              <p>Sehati</p>
            </div>
            <div>
              <a href="https://veganbootcamp.org">
                <Image
                  src={veganBootcamp.src}
                  width={veganBootcamp.width}
                  height={veganBootcamp.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
              <p>Vegan Bootcamp</p>
            </div>
            <div>
              <a href="https://vegancheatsheet.org">
                <Image
                  src={veganCheatSheet.src}
                  width={veganCheatSheet.width}
                  height={veganCheatSheet.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
              <p>Vegan Cheat Sheet</p>
            </div>
          </div>
          <div className="relative mx-auto mt-10 md:w-1/3">
            <DarkButton href="/projects">See All Projects</DarkButton>
          </div>
          <br />
          <br />
        </div>
      </div>
      <div className="min-h-screen">Rest of the page</div>
    </>
  );
};

export default Home;
