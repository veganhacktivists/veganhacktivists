import Link from 'next/link';
import React, { useState } from 'react';
import Hero from '../../components/decoration/hero';
import SquareField from '../../components/decoration/squares';

import {
  FirstSubSection,
  SubSection,
} from '../../components/decoration/textBlocks';
import { HighlightBlock } from '../../components/layout/yearInReview/highlightBlock';
import { HighlightedProjects } from '../../components/layout/yearInReview/highlightedProjects';
import { Organizations } from '../../components/layout/yearInReview/organizations';
import { DarkButton } from '../../components/decoration/buttons';
import Sprite, { cow } from '../../components/decoration/sprite';
import { animated, useSpring } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import useReduceMotion from '../../hooks/useReduceMotion';
import TopPosts from '../../components/layout/yearInReview/topPosts';
import type { GetStaticProps } from 'next';
import type {
  IBlogEntry,
  IBlogEntryFields,
} from '../../types/generated/contentful';
import { getContents } from '../../lib/cms';
import CustomImage from '../../components/decoration/customImage';
import { NextSeo } from 'next-seo';
import { YearInReviewHeader } from '../../components/layout/yearInReview/layout';
import CustomLink from '../../components/decoration/link';

// images imports
import heroBackground from '../../../public/images/yearInReview/2021/2021-hero.jpg';
import heroTagline from '../../../public/images/yearInReview/2021/2021-type.png';
import pixelHeart from '../../../public/images/VH_PixelHeart.png';
import pixelFlower from '../../../public/images/VH_PixelFlower.png';
import pixelStar from '../../../public/images/VH_PixelStar.png';
import pixelPig from '../../../public/images/VH_PixelPig.png';
import avocadoIcon from '../../../public/images/people/teamIcons/icon-avo.png';
import peachIcon from '../../../public/images/people/teamIcons/icon-peach.png';
import mangoIcon from '../../../public/images/people/teamIcons/icon-mango.png';
import watermelonIcon from '../../../public/images/people/teamIcons/icon-wmelon.png';
import sweetPotatoIcon from '../../../public/images/people/teamIcons/icon-spotato.png';

const STRATEGY_DECORATION_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, top: 0 },
];

const NEW_TEAM_SQUARES = [
  { color: 'grey', size: 16, left: 0, bottom: 0 },
  { color: 'grey-light', size: 16, left: 0, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
];

const MINOR_CHANGES_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, top: 0 },
  { color: 'white', size: 16, right: 0, bottom: 0 },
  { color: 'grey-background', size: 16, right: 0, top: 0 },
];

const PROJECT_SQUARES = [
  { color: 'grey-dark', size: 16, left: 0, bottom: 0 },
  { color: 'grey-light', size: 16, left: 0, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
];

const ORGANIZATIONS_SQUARES = [
  { color: 'grey-background', size: 16, bottom: 0, left: 0 },
  { color: 'white', size: 16, top: 0, left: 32 },

  { color: 'grey-background', size: 16, bottom: 0, right: 0 },
  { color: 'white', size: 16, top: 0, right: 0 },
];

const FINAL_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'grey-background', size: 16, right: 0, top: 0 },
  { color: 'white', size: 16, right: 16, bottom: 0 },
];

const AnimatedNumber: React.FC<{ number: number; approx?: boolean }> = ({
  number,
  approx = false,
}) => {
  const [onView, setOnView] = useState<boolean>(false);

  const prefersReducedMotion = useReduceMotion();

  const { number: interpolatedNumber } = useSpring({
    from: { number: 0 },
    to: { number },
    config: { duration: prefersReducedMotion ? 0 : 500 },
    cancel: !onView,
  });

  return (
    <>
      <Waypoint
        onEnter={() => {
          setOnView(true);
        }}
      />
      <span className="text-7xl xl:text-8xl" aria-label={`${number}`}>
        <animated.span>
          {interpolatedNumber.to((x) =>
            Math.floor(x)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          )}
        </animated.span>
        {approx && <>~</>}
      </span>
    </>
  );
};

// interface YearInReviewProps {}

const YearInReview2021: React.FC = () => {
  return (
    <>
      <NextSeo title="2021 in Review" />
      <YearInReviewHeader
        year={2021}
        hero={
          <Hero
            imageBackground={heroBackground}
            tagline={{
              image: heroTagline,
              alt: '2020 year in review',
            }}
            alignment="left"
            classNameMapping={{
              container: 'bg-center',
            }}
          />
        }
      />

      <CustomImage
        src={pixelHeart.src}
        height={pixelHeart.height / 3}
        width={pixelHeart.width / 3}
        alt=""
      />
      <SubSection
        header="We explored a lot this year"
        headerSize="3xl"
        contentSize="2xl"
      >
        This year, instead of focusing on experimental proejcts, we refined our
        goals and built projects that focused primarily in filling existing gaps
        in our movement. We grew more meaningful partnerships and we greatly
        improved our branding, design team, and services offered. We&apos;re
        excited to show you what we&apos;ve done below!
      </SubSection>

      <div>
        <HighlightBlock
          borderColor="magenta"
          headerStart="We launched"
          headerBold="eight new projects"
          headerEnd="for the movement"
        >
          <b>Four of which were unique ideas of our own!</b> We were also lucky
          enough to work on projects with Sehati Animal Sanctuary, Animal
          Alliance Asia, Vegan Japan Consulting, and many more!
        </HighlightBlock>
        <HighlightBlock
          borderColor="yellow"
          headerStart="We"
          headerBold="expanded our advisory team"
          headerEnd="of vegan experts"
        >
          <b>We&apos;re so thankful to have more advisors to lean on</b> such as
          Katie from Animal Equality, Chris from APEX Advocacy, Tessa from the
          Pollination Project, and Casey from Faunalytics! To browse more of our
          advisors, <CustomLink href="/people/advisors">click here!</CustomLink>
        </HighlightBlock>
        <HighlightBlock
          borderColor="green"
          headerStart="We expanded with"
          headerBold="5 new teams"
          headerEnd="in just 6 months"
        >
          <b>More teams, more impact!</b> We&apos;re so happy to announce the
          growth of our community with 5 new amazing teams! Please welcome Team
          Avocado, Team Mango, Team Watermelon, and Team Sweet Potato.
        </HighlightBlock>

        <div className="flex flex-row w-1/2 mx-auto">
          {[
            avocadoIcon,
            peachIcon,
            mangoIcon,
            watermelonIcon,
            sweetPotatoIcon,
          ].map((icon) => (
            <div key={icon.src}>
              <CustomImage src={icon} alt={icon.src} height={250} width={250} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default YearInReview2021;
