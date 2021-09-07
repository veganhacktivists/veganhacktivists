import React from 'react';
import Head from 'next/head';
import Hero from '../components/decoration/hero';
import type { CandidateRequirementProps } from '../components/layout/join/candidateRequirement';
import CandidateRequirement from '../components/layout/join/candidateRequirement';
import type { JobRoleProps } from '../components/layout/join/jobRole';
import JobRole from '../components/layout/join/jobRole';
import heroBackground from '../../public/images/joinUs/VH-chicken2-hero.jpg';
import heroTagline from '../../public/images/joinUs/VH-join-hero-text.png';
import PixelFlower from '../../public/images/VH_PixelFlower.png';
import PixelBulb from '../../public/images/VH_PixelBulb.png';
import Image from 'next/image';
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
import Sprite, { sheep, chicks } from '../components/decoration/sprite';
import JoinPlayground from '../components/layout/join/joinPlayground';
import SquareField from '../components/decoration/squares';
import { FirstSubSection } from '../components/decoration/textBlocks';

const CANDIDATE_REQUIREMENTS: CandidateRequirementProps[] = [
  {
    description: 'Vegan for at least 3 or more months.',
    image: heartLogo,
    color: 'green',
  },
  {
    description: 'Experience of 2 or more years in your field.',
    image: checkLogo,
    color: 'yellow',
  },
  {
    description: 'A portfolio or resume illustrating your work.',
    image: resumeLogo,
    color: 'magenta',
  },
  {
    description: 'Ability to volunteer at least 5 hours a week.',
    image: clockLogo,
    color: 'orange',
  },
];

const JOB_ROLES: JobRoleProps[] = [
  {
    image: codeLogo,
    color: 'green',
    squareColor: '#58a345',
    title: 'Developers',
    href: 'https://veganhacktivists.typeform.com/to/Vnrv6N',
    description: (
      <>
        We&apos;re looking for developers to build unique, interesting, or
        impactful projects for the animals. We use Laravel for most projects,
        please be comfortable with PHP, JS and CSS. You may be asked to work
        with other activists and organizations who need your support.
      </>
    ),
  },
  {
    image: designLogo,
    color: 'yellow-orange',
    squareColor: '#eb7d23',
    title: 'UI Designers',
    href: 'https://veganhacktivists.typeform.com/to/PBK1we',
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
    squareColor: '#d31679',
    title: 'Graphic Designers',
    href: 'https://veganhacktivists.typeform.com/to/PBK1we',
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
    squareColor: '#fcb216',
    title: 'Social or Marketing',
    href: 'https://veganhacktivists.typeform.com/to/PBK1we',
    description: (
      <>
        We&apos;re looking for people with backgrounds in social media,
        marketing, and advertising. We need help managing our various project
        social accounts. This includes creating daily posts, designing content,
        and interacting with followers.
      </>
    ),
  },
  {
    image: penLogo,
    color: 'red',
    squareColor: '#c61f45',
    title: 'Content Creators',
    href: 'https://veganhacktivists.typeform.com/to/PBK1we',
    description: (
      <>
        We&apos;re looking for people with backgrounds in writing, and creating
        content such as blogs, videos, and other content. Excellent grammar and
        spelling are a must. You&apos;ll be in charge of writing for our blogs,
        newssletters, Patreon, and other social platforms!
      </>
    ),
  },
  {
    image: bubbleLogo,
    color: 'purple',
    squareColor: '#692c81',
    title: 'Translators',
    href: 'https://veganhacktivists.typeform.com/to/PBK1we',
    description: (
      <>
        We&apos;re looking for people that can help us translate vegan content
        in multiple languages. You must consider yourself fluent in the
        languages you translate for, along with having excellent grammar and
        spelling. Translators are highly utilized for projects.
      </>
    ),
  },
];

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
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
    <FirstSubSection header="Join our team">
      We&apos;re always looking for more vegan activist volunteers to join our
      growing team! If you&apos;re interested and have the time, see our
      positions below. Please note that we prioritize people that meet our
      qualifications, but encourage you to apply either way!
    </FirstSubSection>
    <div>
      <div className="p-8 bg-gray-background content-center mx-auto my-16 md:w-1/2 drop-shadow-2xl text-2xl">
        <div className="flex flex-col gap-4">
          {CANDIDATE_REQUIREMENTS.map((requirement, i) => (
            <CandidateRequirement key={i} {...requirement} />
          ))}
        </div>
      </div>
    </div>
    <div className="text-grey content-center mx-auto my-12 md:w-1/2 drop-shadow-2xl text-2xl px-10">
      <Image
        src={PixelFlower.src}
        width={PixelFlower.width / 3}
        height={PixelFlower.height / 3}
        alt=""
      />
      <p>
        We ask that you please be or get familiar with <b>Discord</b> for team
        communication, <b>Trello </b>
        for tracking and workflow, <b>Figma</b> for design collaboration, and
        <b> GitHub</b> for dev collaboration.
      </p>
    </div>
    <JoinPlayground />
    <Sprite image={sheep} pixelsLeft={1} pixelsRight={0} />
    <div className="mt-16 md:max-w-5xl mx-auto mb-16">
      <h2 className="mb-16 text-4xl font-bold">Available Positions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20">
        {JOB_ROLES.map((role) => (
          <JobRole key={role.title} {...role} />
        ))}
        <div className="md:col-span-2 bg-gray-background py-8 md:px-40 text-grey-dark">
          <h2 className="text-4xl font-modo font-bold mb-10">
            Other Talents & Specialists
          </h2>
          <Image
            src={PixelBulb}
            width={PixelBulb.width / 3}
            height={PixelBulb.height / 3}
            alt=""
          />
          <p className="mt-4 mb-4 text-2xl px-10 md:px-0">
            Don&apos;t see a relevant position? If you have other talents or
            skills for vegan movement, let us know. Whether that be legal,
            marketing, or something else, we appreciate the support!
          </p>
          <div className="w-2/3 mx-auto">
            <LightButton
              href="https://veganhacktivists.typeform.com/to/PBK1we"
              className="font-semibold font-mono px-16 py-2"
            >
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
    <Sprite image={chicks} pixelsLeft={1} pixelsRight={1} />
    <MeetOurTeam />
  </>
);

export default Join;
