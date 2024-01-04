import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { NavButton } from '../decoration/buttons';
import Hero from '../decoration/hero';
import SquareField from '../decoration/squares';
import heroBackground from '../../../public/images/VH-pigs-hero.jpg';
import heroTagline from '../../../public/images/about/hero-tagline.png';
import Sprite, { goat } from '../decoration/sprite';

import { GrantsCallToAction } from './grants';

import type { Layout } from '../../types/persistentLayout';

const AboutButtons: React.FC = () => {
  return (
    <div className='flex flex-wrap justify-center mt-10 mb-5'>
      <NavButton href='/about/our-mission'>
        <FormattedMessage
          id='page.about.section.navigation.button.label.mission'
          defaultMessage='OUR MISSION'
        />
      </NavButton>
      <NavButton href='/about/our-story'>
        <FormattedMessage
          id='page.about.section.navigation.button.label.story'
          defaultMessage='OUR STORY'
        />
      </NavButton>
      <NavButton href='/about/our-values'>
        <FormattedMessage
          id='page.about.section.navigation.button.label.values'
          defaultMessage='OUR VALUES'
        />
      </NavButton>
    </div>
  );
};

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const AboutHero: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.about.hero.alt-text',
            defaultMessage: 'Data-Driven Activism',
          }),
        }}
        alignment='left'
        classNameMapping={{
          container: 'bg-center',
        }}
        backgroundImageProps={{ placeholder: 'empty' }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

const AboutLayout: Layout = ({ children }) => {
  return (
    <>
      <AboutHero />
      <AboutButtons />
      {children}
      <SquareField
        squares={[
          { color: 'white', size: 16, top: 0 },
          { color: 'grey-background', size: 16, bottom: 0, left: 16 },
          { color: 'grey-background', size: 16, bottom: 0, right: 0 },
          { color: 'grey-background', size: 16, bottom: 0, right: 16 },
          { color: 'white', size: 16, top: 0, right: 16 },
        ]}
        className='hidden md:block'
      />
      <GrantsCallToAction />
      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default AboutLayout;
