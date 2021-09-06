import Head from 'next/head';
import React from 'react';
import Hero from '../components/decoration/hero';
import heroBackground from '../../public/images/review2020/VH-Hero-review.jpg';
import heroTagline from '../../public/images/review2020/VH-Hero-text-review.png';
import SquareField from '../components/decoration/squares';
import { FirstSubSection } from '../components/decoration/textBlocks';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },

  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const Review2020: React.FC = () => {
  return (
    <>
      <Head>
        <title>2020 in Review | Vegan Hacktivists</title>
      </Head>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'Compassion, Creativity, Code',
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
      <FirstSubSection header="Our 2020 year in review">
        We&apos;re so happy to release our 2020 year in review! Scroll down to
        see all our accomplishments we&apos;ve made thanks to your generous
        support, our partners, and most of all our amazing volunteers!
      </FirstSubSection>
    </>
  );
};

export default Review2020;
