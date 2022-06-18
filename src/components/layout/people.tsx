import { NavButton } from '../decoration/buttons';
import Hero from '../decoration/hero';
import SquareField from '../decoration/squares';
import heroBackground from '../../../public/images/people/VH-cow-hero-nocircles.jpg';
import heroTagline from '../../../public/images/people/VH-team-hero-text.png';
import React from 'react';
import Sprite, { duck } from '../decoration/sprite';
import JoinTheTeam from './joinTheTeam';
import type { Layout } from '../../types/persistentLayout';

export enum Site {
  Patreon = 'patreon',
  Reddit = 'reddit',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Github = 'github',
  LinkedIn = 'linkedin',
  Website = 'website',
  Mail = 'mail',
  Facebook = 'facebook',
}

export interface SocialLink {
  site: Site;
  link: string;
}

const PeopleButtons: React.FC = () => {
  return (
    <div className="mb-5 mt-10 flex justify-center flex-wrap">
      <NavButton href="/people/team">OUR TEAM</NavButton>
      <NavButton href="/people/advisors">OUR ADVISORS</NavButton>
      <NavButton href="/people/partners">OUR PARTNERS</NavButton>
    </div>
  );
};

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 24, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const PeopleHero: React.FC = () => {
  return (
    <>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'Our Community of Passionate Activists',
        }}
        alignment="left"
        classNameMapping={{
          container: 'bg-center',
        }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

const PeopleLayout: Layout = (page) => {
  return (
    <>
      <PeopleHero />
      <PeopleButtons />
      {page}
      <Sprite image={duck} pixelsLeft={1} pixelsRight={1} />
      <SquareField
        squares={[
          { color: 'white', size: 16, left: 0, bottom: 0 },
          { color: 'grey-lighter', size: 16, left: 0, top: 0 },
          { color: 'grey-darker', size: 16, right: 0, bottom: 0 },
          { color: 'grey', size: 16, right: 16, top: 0 },
        ]}
        className="hidden md:block"
      />
      <JoinTheTeam />
    </>
  );
};

export default PeopleLayout;
