import React from 'react';
import Image from 'next/image';
import Hero from '../components/decoration/hero';
import { DarkButton, WhiteButton } from '../components/decoration/buttons';
import heroBackground from '../../public/images/VH-pig2-hero.jpg';
import heroTagline from '../../public/images/VH-projects-hero-text.png';
import activistHubCover from '../../public/images/ActivistHub.png';
import sehatiSanctuaryCover from '../../public/images/Sehati.png';
import JoinTheTeam from '../components/layout/joinTheTeam';
import SquareField from '../components/decoration/squares';
import Head from 'next/head';

interface ProjectProps {
  cover: StaticImageData;
  title: string;
  date: string;
  team: string;
  href: string;
  siteName: string;
}

const Project: React.FC<ProjectProps> = ({
  cover,
  title,
  date,
  team,
  children,
  href,
  siteName,
}) => (
  <div className="flex space-x-8">
    <Image src={cover} alt={title} width={500} />
    <div className="text-left" style={{ width: 700 }}>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="my-3">
        <span className="font-bold text-grey">{date}</span> -{' '}
        <span className="uppercase font-bold">{team}</span>
      </p>
      {children}
      <div className="mt-10 w-min">
        <DarkButton href={href} className="font-mono">
          {siteName}
        </DarkButton>
      </div>
    </div>
  </div>
);

const projects = [
  {
    title: 'Activist Hub',
    cover: activistHubCover,
    date: 'APR 2021',
    team: 'Team Watermelon',
    content: (
      <p>
        The days of wondering whether or not our activism is effective are over.
        Activist Hub is the world&apos;s first street outreach dashboard that
        provides volunteers with the ability to monitor and understand their
        effectiveness through real data and analytics (DnA). Personal and group
        results will help everyone interested in making informed and strategic
        decisions for the animals!
      </p>
    ),
    siteName: 'ActivistHub.org',
    href: 'https://activisthub.org',
  },
  {
    title: 'Sehati Sanctuary',
    cover: sehatiSanctuaryCover,
    date: 'MAR 2021',
    team: 'Team Eggplant',
    content: (
      <p>
        Sehati Animal Sanctuary is the first farmed animal sanctuary in
        Indonesia which provides a loving haven to animals rescued from needless
        exploitation, violence, and slaughter. The sanctuary supports
        human-animal bonding and serves to educate the public about animal
        rights in order to reduce worldwide animal suffering.
      </p>
    ),
    siteName: 'SehatiSanctuary.org',
    href: 'https://sehatisanctuary.org',
  },
];

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'magenta', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow_orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const JOIN_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, top: 0 },
  { color: 'gray-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'gray-lighter', size: 16, right: 0, bottom: 0 },
];

const Projects: React.FC = () => (
  <>
    <Head>
      <title>Projects | Vegan Hacktivists</title>
    </Head>
    <div>
      <Hero
        imageBackground={heroBackground.src}
        alignment="left"
        classNameMapping={{
          container: 'bg-center',
        }}
      >
        <div className="p-16">
          <Image
            src={heroTagline.src}
            width={heroTagline.width}
            height={heroTagline.height}
            alt="Building projects with impact"
          />
        </div>
      </Hero>
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="text-grey content-center mx-auto my-32 md:w-1/2 drop-shadow-2xl text-2xl">
        <h1 className="mb-16">
          <span className="font-italic text-3xl">Our </span>
          <b className="font-mono text-5xl uppercase">projects</b>
        </h1>
        <p>
          We&apos;re constantly working on new projects every month, whether
          they&apos;re ideas of our own or supporting organizations and
          activists that reach out to us. Below is a list of our work, and which
          of our teams worked on it.
        </p>
      </div>
      <div className="flex flex-col space-y-20 items-center mx-auto drop-shadow-2xl text-2xl pb-20">
        <p className="space-x-4">
          <WhiteButton className="w-40 uppercase" active>
            View all
          </WhiteButton>
          <WhiteButton className="w-40">2021</WhiteButton>
          <WhiteButton className="w-40">2020</WhiteButton>
          <WhiteButton className="w-40">2019</WhiteButton>
          <WhiteButton className="w-40">2018</WhiteButton>
        </p>
        {projects.map(({ content, ...project }) => (
          <Project key={project.title} {...project}>
            {content}
          </Project>
        ))}
      </div>
      <SquareField
        squares={JOIN_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <JoinTheTeam />
    </div>
  </>
);

export default Projects;
