import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Hero from '../components/decoration/hero';
import heroBackground from '../../public/images/review2020/VH-Hero-review.jpg';
import heroTagline from '../../public/images/review2020/VH-Hero-text-review.png';
import SquareField from '../components/decoration/squares';
import {
  FirstSubSection,
  SubSection,
} from '../components/decoration/textBlocks';
import pixelHeart from '../../public/images/VH_PixelHeart.png';
import pixelFlower from '../../public/images/VH_PixelFlower.png';
import { HighlightBlock } from '../components/layout/review2020/HighlightBlock';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },

  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const STRATEGY_DECORATION_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, top: 0 },
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
      <FirstSubSection header="Our 2020 year in review" firstWordsNum={2}>
        We&apos;re so happy to release our 2020 year in review! Scroll down to
        see all our accomplishments we&apos;ve made thanks to your generous
        support, our partners, and most of all our amazing volunteers!
      </FirstSubSection>
      <Image
        src={pixelHeart.src}
        height={pixelHeart.height / 3}
        width={pixelHeart.width / 3}
        alt="Pixel art rendering of a heart with a green banner underneath"
      />
      <SubSection
        header="We grew a lot as a community"
        headerSize="4xl"
        contentSize="2xl"
      >
        This year, we worked with some amazing vegan organizations, helped a lot
        of people with their advocacy, and had a blast building interesting
        projects for the movement. Our team almost grew three fold and there
        were a lot of new challenges that came with that growth, but we&apos;re
        really happy with what we accomplished and we can&apos;t wait to see
        what 2021 brings for us!
      </SubSection>
      <div className="h-12" />
      <HighlightBlock
        borderColor="magenta"
        headerStart="WE LAUNCHED"
        headerBold="SEVEN PROJECTS"
        headerEnd="FOR THE MOVEMENT"
      >
        This year we launched 7 new projects, 3 of which were completely custom
        project ideas of our own, and 4 were for other organizations. We worked
        on projects with Excelsior 4, Lebanese Vegans, Animal Save Movement, and
        Animal Rebellion!
      </HighlightBlock>
      <HighlightBlock
        borderColor="yellow"
        headerStart="WE EXPANDED OUR TEAM FROM"
        headerBold="28 TO 80 VOLUNTEERS"
      >
        We expanded from 3 teams of 28 volunteers to 7 teams of 80 volunteers!
        We were anle to open up more positions including content creators,
        animators, social media, advertising, and marketing experts.
      </HighlightBlock>
      <HighlightBlock
        borderColor="green"
        headerStart="WE NOW HAVE AN"
        headerBold="ADVISORS TEAM"
        headerEnd="FOR SUPPORT"
      >
        We&apos;re so incredibly thankful to have a new team of experienced
        advisors. These advisors include Seb Alex (Ethics over Habits), Ryuji
        Chua (Peace by Vegan), Leah Doellinger (Meat The Victims) and Michael
        Dearborn (Mic The Vegan).
      </HighlightBlock>
      <div className="h-16" />
      <SquareField
        squares={STRATEGY_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="bg-gray-background py-8">
        <Image
          src={pixelFlower.src}
          height={pixelFlower.height / 3}
          width={pixelFlower.width / 3}
          alt="Pixel art rendering of a heart with a green banner underneath"
        />
        <SubSection
          header="Strategy and experimentation"
          headerSize="3xl"
          contentSize="2xl"
        >
          Like 2019, we focused on building experimental projects with little
          knowledge whether they would take off. This is considered a high-risk
          strategy ad we use hundreds of hours volunteer time on projects that
          may or may not be impactful. This worked for us in 2019 as 3 of the 6
          projects we built met our standards of success, so we wanted to
          continue with this methodology. We do firmly believe it&apos;s
          important for the movement to innovate and try new tactics,
          strategies, and build experimental tools
        </SubSection>
        <SquareField
          squares={[{ color: 'grey-light', size: 16, bottom: 0, right: 0 }]}
          className="hidden md:block"
        />
      </div>
    </>
  );
};

export default Review2020;
