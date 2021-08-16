import React from 'react';
import Head from 'next/head';
import Hero from '../components/decoration/hero';
import CandidateRequirement from '../components/layout/candidateRequirement';
import JobRole from '../components/layout/jobRole';
import heroBackground from '../../public/images/joinUs/VH-chicken2-hero-nocircles.jpg';
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
    <div className="text-grey content-center mx-auto my-20 md:w-1/2 drop-shadow-2xl text-2xl">
      <h1 className="mb-16">
        <span className="font-mono text-5xl uppercase text-black font-bold">
          Join our team
        </span>
      </h1>
      <p>
        We&apos;re always looking for more vegan activist volunteers to join our
        team! If you&apos;re interested and have the time to spare, see our
        positions below.
      </p>
      <h2 className="mt-16">
        {/*<span className="font-italic text-3xl"></span>*/}
        <span className="font-mono text-4xl text-black font-bold">
          We&apos;re looking for:
        </span>
      </h2>
      <div className="flex flex-col gap-4">
        <CandidateRequirement
          image={heartLogo}
          description="Vegan for at least 2 months"
          color="green"
        />
        <CandidateRequirement
          image={checkLogo}
          description="Minimum 2 years experience in the field you're applying for"
          color="yellow"
        />
        <CandidateRequirement
          image={resumeLogo}
          description="A portfolio/resume that illustrates your skills and experience"
          color="magenta"
        />
        <CandidateRequirement
          image={clockLogo}
          description="Ability to volunteer at least 4 hours per week"
          color="orange"
        />
      </div>
      <p className="mt-16">
        Please be familiar with <strong>Discord</strong> for team communication,{' '}
        <strong>Trello</strong>
        for tracking and workflow, <strong>Figma</strong> for UI design
        collaboration, and/or&nbsp;
        <strong>GitHub</strong> for dev collaboration.
      </p>
    </div>
    <div className="bg-black text-white text-xl pt-16 pb-16">
      <div className="mx-auto md:w-1/2">
        <h1 className="mb-8 text-4xl font-bold font-mono">
          Attention Developers!
        </h1>
        <p className="mb-4">
          Join <strong>VH: Playground</strong>, our open source community, to
          begin contributing to animal rights projects today!
        </p>
        <p className="mb-8">
          <em>
            Note: Due to limited spots on our core teams, we only recruit
            developers that are active in VH: Playground.
          </em>
        </p>
        <LightButton>Join VH: Playground</LightButton>
      </div>
    </div>
    <div className="mt-16 md:w-1/2 mx-auto mb-16">
      <h1 className="mb-8 text-3xl font-mono">Available Positions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <JobRole
          image={codeLogo}
          color="green"
          title="Developers"
          description={`We're looking for developers looking to build unique, interesting, or impactful
            projects for the animals. We use Laravel for almost all projects, please be comfortable
            with PHP, JS and CSS. You may be asked to work with other activists and organizations who
            need your support.`}
        />
        <JobRole
          image={designLogo}
          color="orange"
          title="UI Designers"
          description={`We're looking for UI designers to support us by producing modern, visually appealing website
            designs for our website projects. You would also be advising us on proper UX for older projects
            that we're updating and may be asked to help our partners, activists, and organizations.`}
        />
        <JobRole
          image={paintBrushLogo}
          color="magenta"
          title="Graphic Designers"
          description={`We're looking for graphic designers to support us by producing high-quality, visually appealing
            design content for our projects, including logos, banners, social media posts, icons, and similar
            resources. Please include a portfolio of your most recent works.`}
        />
        <JobRole
          image={socialMediaLogo}
          color="yellow"
          title="Social Media Managers"
          description={`We're looking for someone with a background in social media marketing, advertising, and
            graphic design. We need someone to help build our Instagram, to keep it active, and relevant.
            You'll be in charge of posting one standard post a day, along with interacting with our
            followers.`}
        />
        <JobRole
          image={penLogo}
          color="red"
          title="Content Creators"
          description={`We're looking for someone with a background in writing, creating content such as blogs,
            videos, and other content. Excellent grammar and spelling are a must. You'll be in charge
            of writing for our blog, but also our newsletters, Patreon, and other social platforms.`}
        />
        <JobRole
          image={bubbleLogo}
          color="purple"
          title="Translators"
          description={`We're looking for people that can help us translate important projects into multiple
            languages. You must consider yourself fluent in the languages you translate for, along
            with having excellent grammar and spelling. Translators are highly utilized for projects.`}
        />
        <div className="md:col-span-2 bg-gray-background py-8 md:px-8">
          <h2 className="text-2xl font-modo font-bold">
            Other Talents & Specialists
          </h2>
          <p className="mt-4 mb-4">
            Don&apos;t see a position for you here? If you have any other
            talents or skills that may be use for vegan movement, let us know!
            Whether that be legal advice, devops, or something else, we
            appreciate the support!
          </p>
          <div>
            <LightButton>Apply Now</LightButton>
          </div>
        </div>
      </div>
    </div>
    <MeetOurTeam />
  </>
);

export default Join;
