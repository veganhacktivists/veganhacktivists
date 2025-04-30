import { NextSeo } from 'next-seo';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Hero from '../components/decoration/hero';
import CandidateRequirement from '../components/layout/join/candidateRequirement';
import heroBackground from '../../public/images/joinUs/VH-chicken2-hero.jpg';
import heroTagline from '../../public/images/joinUs/VH-join-hero-text.png';
import heartLogo from '../../public/images/joinUs/VH-join-mini-icon-heart.png';
import checkLogo from '../../public/images/joinUs/VH-join-mini-icon-check.png';
import resumeLogo from '../../public/images/joinUs/VH-join-mini-icon-resume.png';
import { DarkButton } from '../components/decoration/buttons';
import Sprite, { chicks } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { FirstSubSection } from '../components/decoration/textBlocks';
import { pixelFlower } from '../images/separators';

import CustomImage from 'components/decoration/customImage';

import type { IntlShape } from 'react-intl';
import type { CandidateRequirementProps } from '../components/layout/join/candidateRequirement';

const getCandidateRequirementProps = (
  intl: IntlShape,
): CandidateRequirementProps[] => [
  {
    description: intl.formatMessage({
      id: 'page.join.section.requirements.0',
      defaultMessage: 'Committed to a vegan lifestyle',
    }),
    image: heartLogo,
    color: 'green',
  },
  {
    description: intl.formatMessage({
      id: 'page.join.section.requirements.1',
      defaultMessage:
        'Able to show your skills through a portfolio, resume, or past work',
    }),
    image: resumeLogo,
    color: 'magenta',
  },
  {
    description: intl.formatMessage({
      id: 'page.join.section.requirements.2',
      defaultMessage:
        'Eager to work with advocates and organizations on projects that align with your passions',
    }),
    image: checkLogo,
    color: 'yellow',
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

const Join: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.join.next-seo.title',
          defaultMessage: 'Join Us',
        })}
      />
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.join.hero.image-alt',
            defaultMessage: 'You are their voice',
          }),
        }}
        alignment='left'
        classNameMapping={{
          backgroundImage: 'object-[75%_0] md:object-center',
        }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.join.section.join-our-team.headline',
          defaultMessage: '<b>Use your skills to help animals</b>',
        })}
      >
        <p className='pb-8'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.0'
            defaultMessage="You want to do more for animals – and you’re not alone. Maybe you’ve been looking for a way to team up with like-minded people who share your values. Maybe you're ready to take the next step but haven’t found the right opportunity. Or maybe you know exactly what you’re capable of, and you’re just waiting for the moment to use your skills where they matter most – fighting for a better world for animals."
          />
        </p>

        <p className='pb-8'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.1'
            defaultMessage='<b>Playground</b> is our platform where mission-aligned people like you use their skills to make a difference – and collaborate with professional animal advocates and organizations all around the world.'
            values={{
              b: (chunks: React.ReactNode) => (
                <span className='font-bold'>{chunks}</span>
              ),
            }}
          />
        </p>

        <p className='pb-4'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.2'
            defaultMessage='If you are:'
          />
        </p>

        <div>
          <div className='p-8 bg-gray-background content-center text-2xl text-left'>
            <div className='flex flex-col gap-4'>
              {getCandidateRequirementProps(intl).map((requirement, i) => (
                <CandidateRequirement key={i} {...requirement} />
              ))}
            </div>
          </div>
        </div>

        <p className='pt-4 pb-8'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.3'
            defaultMessage='Then this is your place.'
          />
        </p>

        <p className='font-bold pb-8'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.4'
            defaultMessage='Browse available requests and leverage your skills for animals.'
          />
        </p>

        <DarkButton href='/playground' className='w-fit mx-auto mb-20'>
          <FormattedMessage
            id='page.join.section.join-our-team.cta'
            defaultMessage='Head to Playground'
          />
        </DarkButton>

        <CustomImage
          src={pixelFlower.src}
          width={pixelFlower.width / 3}
          height={pixelFlower.height / 3}
          alt=''
        />
        <p className='py-8'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.5'
            defaultMessage='There’s an endless need for skilled support in the animal advocacy movement, with countless requests coming in, each reflecting the movement’s diverse needs. While we can’t fulfill them all, we created Playground to help the movement achieve more – together with incredible volunteers like you.'
          />
        </p>

        <p className='pb-8'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.6'
            defaultMessage='<b>Playground</b> is a VH program designed to support the high volume of requests from advocates and organizations around the world.'
            values={{
              b: (chunks: React.ReactNode) => (
                <span className='font-bold'>{chunks}</span>
              ),
            }}
          />
        </p>

        <p className='pb-8'>
          <FormattedMessage
            id='page.join.section.join-our-team.paragraph.7'
            defaultMessage='When you volunteer through Playground, you create a tangible impact for animals, advance your expertise in the movement, and collaborate on projects that align with your skills and passions.'
          />
        </p>

        <DarkButton href='/playground' className='w-fit mx-auto'>
          <FormattedMessage
            id='page.join.section.join-our-team.cta-browse-requests'
            defaultMessage='Browse available requests'
          />
        </DarkButton>
      </FirstSubSection>

      <Sprite image={chicks} pixelsLeft={1} pixelsRight={1} />
    </>
  );
};

export default Join;
