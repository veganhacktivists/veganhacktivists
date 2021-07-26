import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import blogCow from '../../public/images/Blog-cow.jpg';
import activistHub from '../../public/images/projects/ActivistHub.png';
import animalRightsMap from '../../public/images/projects/AnimalRightsMap.png';
import DailyDozen from '../../public/images/projects/DailyDozen.png';
import dailyNooch from '../../public/images/projects/DailyNooch.png';
import minutesvegans from '../../public/images/projects/minutesvegans.png';
import VeganActivism from '../../public/images/projects/VeganActivism.jpg';
import veganBootcamp from '../../public/images/projects/VeganBootcamp.png';
import veganCheatSheet from '../../public/images/projects/VeganCheatSheet.jpeg';
import heroBackground from '../../public/images/VH-hero-bg.jpg';
import heroTagline from '../../public/images/VH-hero-tagline.png';
import pixelHeart from '../../public/images/VH_PixelHeart.png';
import {
  DarkButton,
  GreenButton,
  LightButton,
} from '../components/decoration/buttons';
import Hero from '../components/decoration/hero';
import SquareField from '../components/decoration/squares';
import JoinTheTeam from '../components/layout/joinTheTeam';

const HERO_DECORATION_SQUARES = [
  { color: 'green', size: 32, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, bottom: 0 },
  { color: 'white', size: 16, right: 64, bottom: 0 },
  { color: 'magenta', size: 32, right: 0, bottom: 0 },
  { color: 'yellow', size: 32, left: 32, top: 0 },
  { color: 'yellow_orange', size: 16, left: 16, top: 32 },
  { color: 'red', size: 32, right: 32, top: 0 },
];

const PROJECT_DECORATION_SQUARES = [
  { color: 'gray-background', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, top: 0 },
  { color: 'gray-background', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

const JOIN_DECORATION_SQUARES = [
  { color: 'gray', size: 32, left: 0, top: 0 },
  { color: 'gray-background', size: 16, left: 32, top: 0 },
  { color: 'gray-lighter', size: 16, left: 32, bottom: 0 },
];

const BLOG_DECORATION_SQUARES = [
  { color: 'white', size: 16, right: 0, bottom: 0 },
  { color: 'gray-lighter', size: 16, right: 0, top: 0 },
];

const BLOG_INNER_DECORATION_SQUARES = [
  { color: 'gray-lighter', size: 16, right: 0, bottom: 0 },
];

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Vegan Hacktivists | Developers Coding for a Vegan World</title>
      </Head>
      <Hero
        main
        imageBackground={heroBackground}
        alignment="right"
        classNameMapping={{
          container: 'bg-center',
        }}
      >
        <div className="md:p-12">
          <Image
            src={heroTagline}
            width={heroTagline.width * 0.65}
            height={heroTagline.height * 0.65}
            alt="Compassion, Creativity, Code"
            quality={100}
            priority
          />
        </div>
        <div className="relative text-white mx-auto md:w-1/2 drop-shadow-2xl text-2xl">
          Fighting for the animal rights movement since 2019.
        </div>
        <div className="relative mx-auto mt-10">
          <LightButton href="/about">Learn More</LightButton>
        </div>
      </Hero>
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="content-center mx-auto my-32 md:w-1/2 drop-shadow-2xl text-2xl px-5">
        <Image
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Compassion, Creativity, Code"
        />
        <p className="mb-16 text-grey-dark">
          <span className="font-italic font-semibold text-3xl">We are </span>
          <span className="text-5xl font-mono font-semibold">
            VEGAN HACKTIVISTS
          </span>
        </p>
        <p className="pb-5">
          We&apos;re a diverse community of passionate vegan activists from all
          around the world, <b>volunteering our time and skills</b> towards the
          animal rights movement. We build free technology with the goal of
          reducing or stopping the mass amounts of suffering caused by factory
          farming and other forms of animal exploitation.
        </p>
        <p>
          <b>We do this for the animals</b> - we do this because coding is our
          way of doing our part for activism. If you believe in the work we do
          and want to support us, please consider a small donation via our{' '}
          <a
            className="text-pink font-semibold"
            href="https://www.patreon.com/veganhacktivists"
            target="_blank"
            rel="noreferrer"
          >
            Patreon
          </a>
          ! It means the world to us and the animals to have your support.
        </p>
        <div className="relative mx-auto mt-10 md:w-1/3">
          <DarkButton href="/about/our-mission" className="font-mono text-sm">
            Our Mission
          </DarkButton>
        </div>
      </div>
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="bg-grey-background">
        <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pt-16 px-5">
          <p className="text-grey-dark pb-5">
            <span className="font-italic font-semibold text-3xl">
              Featured{' '}
            </span>
            <b className="text-5xl font-mono">PROJECTS</b>
          </p>
          <p>
            Every project we release is <b>100% free for everyone</b>, we don’t
            do premium versions, advertisments, or sell user data what-so-ever.
          </p>
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-4 pt-16">
            <div>
              <a href="https://activisthub.org">
                <Image
                  className="rounded-2xl"
                  src={activistHub.src}
                  width={activistHub.width}
                  height={activistHub.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
            <div>
              <a href="https://veganbootcamp.org">
                <Image
                  className="rounded-2xl"
                  src={veganBootcamp.src}
                  width={veganBootcamp.width}
                  height={veganBootcamp.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
            <div>
              <a href="https://animalrightsmap.org">
                <Image
                  className="rounded-2xl"
                  src={animalRightsMap.src}
                  width={animalRightsMap.width}
                  height={animalRightsMap.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
            <div>
              <a href="https://5minutes5vegans.org">
                <Image
                  className="rounded-2xl"
                  src={minutesvegans.src}
                  width={minutesvegans.width}
                  height={minutesvegans.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
            <div>
              <a href="https://vegancheatsheet.org">
                <Image
                  className="rounded-2xl"
                  src={veganCheatSheet.src}
                  width={veganCheatSheet.width}
                  height={veganCheatSheet.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
            <div>
              <a href="https://dailynooch.org">
                <Image
                  className="rounded-2xl"
                  src={dailyNooch.src}
                  width={dailyNooch.width}
                  height={dailyNooch.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
            <div>
              <a href="https://mydailydozen.org">
                <Image
                  className="rounded-2xl"
                  src={DailyDozen.src}
                  width={DailyDozen.width}
                  height={DailyDozen.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
            <div>
              <a href="https://VeganActivism.org">
                <Image
                  className="rounded-2xl"
                  src={VeganActivism.src}
                  width={VeganActivism.width}
                  height={VeganActivism.height}
                  alt="Compassion, Creativity, Code"
                />
              </a>
            </div>
          </div>
          <div className="relative mx-auto mt-10 md:w-1/3 pb-16">
            <DarkButton href="/projects" className="font-mono text-sm">
              See All Projects
            </DarkButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={JOIN_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <JoinTheTeam />
      <SquareField
        squares={BLOG_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pt-16">
        <p className="text-grey-dark pb-5">
          <span className="font-italic font-semibold text-3xl">On the </span>
          <b className="text-5xl font-mono">BLOG</b>
        </p>
        <p className="pb-16">
          We regularly post project updates, announcements, interviews, and
          other fun stuff here! Thanks for reading!
        </p>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-4 md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-4 lg:px-32 md:px-32 px-16">
        <div className="overflow-hidden w-full">
          <Image
            src={blogCow.src}
            width={blogCow.width}
            height={blogCow.height}
            className="w-full bg-cover"
            alt="Compassion, Creativity, Code"
          />
        </div>
        <div className="overflow-hidden w-full">
          <Image
            src={blogCow.src}
            width={blogCow.width}
            height={blogCow.height}
            className="w-full bg-cover"
            alt="Compassion, Creativity, Code"
          />
        </div>
        <div className="overflow-hidden w-full">
          <Image
            src={blogCow.src}
            width={blogCow.width}
            height={blogCow.height}
            className="w-full bg-cover"
            alt="Compassion, Creativity, Code"
          />
        </div>
      </div>
      <SquareField
        squares={BLOG_INNER_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="grid lg:grid-cols-3 lg:gap-4 md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-4 lg:px-32 md:px-32 px-16 pb-5 bg-grey">
        <div className="overflow-hidden w-full">
          <div className="px-8 pt-6 pb-6 content-center mx-auto bg-white">
            <p className="font-semibold text-2xl">
              Developers! Join Our New Open Source Community - VH: Playground
            </p>
          </div>
          <GreenButton href="/">Read More</GreenButton>
        </div>
        <div className="overflow-hidden w-full">
          <div className="px-8 pt-6 pb-6 content-center mx-auto bg-white">
            <p className="font-semibold text-2xl">
              Developers! Join Our New Open Source Community - VH: Playground
            </p>
          </div>
          <GreenButton href="/">Read More</GreenButton>
        </div>
        <div className="overflow-hidden w-full">
          <div className="px-8 pt-6 pb-6 content-center mx-auto bg-white">
            <p className="font-semibold text-2xl">
              Developers! Join Our New Open Source Community - VH: Playground
            </p>
          </div>
          <GreenButton href="/">Read More</GreenButton>
        </div>
      </div>
      <div className="bg-grey">
        <div className="relative mx-auto pt-10 md:w-1/3 pb-16 sm:px-24 px-20">
          <LightButton href="/projects" className="font-mono text-sm font-bold">
            SEE OUR POSTS
          </LightButton>
        </div>
      </div>
      <div className="bg-grey space-y-0">
        <div className="inline-block">
          <div className="content-center mx-auto bg-white">
            <div className="overflow-hidden w-full">
              <Image
                src={blogCow.src}
                width={blogCow.width / 1.3}
                height={blogCow.height / 2}
                className="w-full bg-cover"
                alt="Compassion, Creativity, Code"
              />
            </div>
            <p className="font-semibold text-2xl">
              Developers! Join Our New Open Source Community - VH: Playground
            </p>
          </div>
        </div>
        <div className="inline-block">
          <div className="content-center mx-auto bg-white">
            <div className="overflow-hidden w-full">
              <Image
                src={blogCow.src}
                width={blogCow.width / 1.3}
                height={blogCow.height / 2}
                className="w-full bg-cover"
                alt="Compassion, Creativity, Code"
              />
            </div>
            <p className="font-semibold text-2xl">
              Developers! Join Our New Open Source Community - VH: Playground
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
