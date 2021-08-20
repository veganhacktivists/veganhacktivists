import React from 'react';
import Head from 'next/head';
import Hero from '../components/decoration/hero';
import type { CandidateRequirementProps } from '../components/layout/join/candidateRequirement';
import CandidateRequirement from '../components/layout/join/candidateRequirement';
import type { JobRoleProps } from '../components/layout/join/jobRole';
import JobRole from '../components/layout/join/jobRole';
import heroBackground from '../../public/images/joinUs/VH-chicken2-hero.jpg';
import heroTagline from '../../public/images/joinUs/VH-join-hero-text.png';
import heartLogo from '../../public/images/joinUs/VH-join-mini-icon-heart.png';
import checkLogo from '../../public/images/joinUs/VH-join-mini-icon-check.png';
import resumeLogo from '../../public/images/joinUs/VH-join-mini-icon-resume.png';
import clockLogo from '../../public/images/joinUs/VH-join-mini-icon-time.png';
import codeLogo from '../../public/images/joinUs/VH-icon-dev.png';
import designLogo from '../../public/images/joinUs/VH-icon-uidesigner.png';
import paintBrushLogo from '../../public/images/joinUs/VH-icon-graphicdesign.png';
import socialMediaLogo from '../../public/images/joinUs/VH-icon-socialmedia.png';
import penLogo from '../../public/images/joinUs/VH-icon-writer.png';
import bubbleLogo from '../../public/images/joinUs/VH-icon-translator.png';
import { LightButton } from '../components/decoration/buttons';
import MeetOurTeam from '../components/layout/meetOurTeam';
import Sprite, { sheep } from '../components/decoration/sprite';
import JoinPlayground from '../components/layout/join/joinPlayground';
import SquareField from '../components/decoration/squares';
import { FirstSubSection } from '../components/decoration/textBlocks';

const CANDIDATE_REQUIREMENTS: CandidateRequirementProps[] = [
  {
    description: 'Vegan for at least 2 months',
    image: heartLogo,
    color: 'green',
  },
  {
    description: 'Minimum 2 years experience in the field you\'re applying for',
    image: checkLogo,
    color: 'yellow',
  },
  {
    description:
      'A portfolio/resume that illustrates your skills and experience',
    image: resumeLogo,
    color: 'magenta',
  },
  {
    description: 'Ability to volunteer at least 4 hours per week',
    image: clockLogo,
    color: 'orange',
  },
];

const JOB_ROLES: JobRoleProps[] = [
  {
    image: codeLogo,
    color: 'green',
    title: 'Developers',
    description: (
      <>
        We&apos;re looking for developers looking to build unique, interesting,
        or impactful projects for the animals. We use Laravel for almost all
        projects, please be comfortable with PHP, JS and CSS. You may be asked
        to work with other activists and organizations who need your support.
      </>
    ),
  },
  {
    image: designLogo,
    color: 'yellow-orange',
    title: 'UI Designers',
    description: (
      <>
        We&apos;re looking for UI designers to support us by producing modern,
        visually appealing website designs for our website projects. You would
        also be advising us on proper UX for older projects that we&apos;re
        updating and may be asked to help our partners, activists, and
        organizations.
      </>
    ),
  },
  {
    image: paintBrushLogo,
    color: 'pink',
    title: 'Graphic Designers',
    description: (
      <>
        We&apos;re looking for graphic designers to support us by producing
        high-quality, visually appealing design content for our projects,
        including logos, banners, social media posts, icons, and similar
        resources. Please include a portfolio of your most recent works.
      </>
    ),
  },
  {
    image: socialMediaLogo,
    color: 'yellow',
    title: 'Social Media Managers',
    description: (
      <>
        We&apos;re looking for someone with a background in social media
        marketing, advertising, and graphic design. We need someone to help
        build our Instagram, to keep it active, and relevant. You&apos;ll be in
        charge of posting one standard post a day, along with interacting with
        our followers.
      </>
    ),
  },
  {
    image: penLogo,
    color: 'red',
    title: 'Content Creators',
    description: (
      <>
        We&apos;re looking for someone with a background in writing, creating
        content such as blogs, videos, and other content. Excellent grammar and
        spelling are a must. You&apos;ll be in charge of writing for our blog,
        but also our newsletters, Patreon, and other social platforms.
      </>
    ),
  },
  {
    image: bubbleLogo,
    color: 'purple',
    title: 'Translators',
    description: (
      <>
        We&apos;re looking for people that can help us translate important
        projects into multiple languages. You must consider yourself fluent in
        the languages you translate for, along with having excellent grammar and
        spelling. Translators are highly utilized for projects.
      </>
    ),
  },
];

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 32, left: 16, bottom: 0 },
  { color: 'green', size: 16, lwft: 0, top: 0 },

  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const Join: React.FC = () => (
  <>
    <Head>
      <title>Join us | Vegan Hacktivists</title>
    </Head>
    <Hero
      imageBackground={heroBackground}
      tagline={{
        image: heroTagline,
        alt: 'You are their voice',
      }}
      alignment="left"
    />
    <SquareField
      squares={HERO_DECORATION_SQUARES}
      className="hidden md:block"
    />
    <div className="content-center mx-auto my-20 md:w-1/2 drop-shadow-2xl text-2xl">
      <div className="text-grey">
        <h1 className="mb-10">
          <span className="font-mono text-7xl uppercase font-semibold">
            Join our team
          </span>
        </h1>
        <p className="font-semibold font-mono text-3xl">
          We&apos;re always looking for more vegan activist volunteers to join
          our team! If you&apos;re interested and have the time to spare, see
          our positions below.
        </p>
      </div>
      <div className="text-grey-dark">
        <h2 className="mt-16">
          <span className="font-mono text-5xl text-grey-dark font-bold">
            We&apos;re looking for:
          </span>
        </h2>
        <div className="flex flex-col gap-4">
          {CANDIDATE_REQUIREMENTS.map((requirement, i) => (
            <CandidateRequirement key={i} {...requirement} />
          ))}
        </div>
        <p className="mt-16 text-3xl">
          Please be familiar with <strong>Discord</strong> for team
          communication, <strong>Trello</strong> for tracking and workflow,{' '}
          <strong>Figma</strong> for UI design collaboration, and/or{' '}
          <strong>GitHub</strong> for dev collaboration.
        </p>
      </div>
    </div>
    <JoinPlayground />
    <Sprite image={sheep} />
    <div className="mt-16 md:max-w-7xl mx-auto mb-16">
      <h2 className="mb-16 text-4xl font-bold">Available Positions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24">
        {JOB_ROLES.map((role) => (
          <JobRole key={role.title} {...role} />
        ))}
        <div className="md:col-span-2 bg-gray-background py-8 md:px-40 text-grey-dark">
          <h2 className="text-4xl font-modo font-bold mb-10">
            Other Talents & Specialists
          </h2>
          <p className="mt-4 mb-4 text-3xl">
            Don&apos;t see a position for you here? If you have any other
            talents or skills that may be use for vegan movement, let us know!
            Whether that be legal advice, devops, or something else, we
            appreciate the support!
          </p>
          <div>
            <LightButton className="font-bold font-mono px-16 py-2 my-4">
              Apply Now
            </LightButton>
          </div>
        </div>
      </div>
    </div>
    <SquareField
      squares={[
        { color: 'white', size: 16, top: 0, left: 0 },
        { color: 'grey-light', size: 16, bottom: 0, left: 0 },
        { color: 'grey-light', size: 16, bottom: 0, right: 0 },
      ]}
      className="hidden md:block"
    />
    <MeetOurTeam />
  </>
);

export default Join;
