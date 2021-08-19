import React from 'react';
import Head from 'next/head';

import Hero from '../components/decoration/hero';
import InfoBox from '../components/infoBox';
import SquareField from '../components/decoration/squares';
import Sprite, { pig } from '../components/decoration/sprite';

import heroBackground from '../../public/images/services/VH-chick-hero.jpg';
import heroTagline from '../../public/images/services/VH-services-hero-text.png';
import adviceIcon from '../../public/images/services/Services-icon-advice.png';
import fundingIcon from '../../public/images/services/Services-icon-funding.png';
import projectIcon from '../../public/images/services/Services-icon-project.png';
import webIcon from '../../public/images/services/Services-icon-web.png';

import { FirstSubSection } from '../components/decoration/textBlocks';
import { DarkButton } from '../components/decoration/buttons';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

interface ServiceProps {
  title: string;
  icon: StaticImageData;
  iconBgColor: string;
  iconAccentColor: string;
  align: 'left' | 'right';
  content: React.ReactNode;
  button?: {
    text: React.ReactNode;
    href: string;
  };
}

const SERVICE_BLOCKS: Omit<ServiceProps, 'align'>[] = [
  {
    title: 'Websites',
    content:
      'If you\'re a small vegan activist, organization, or business with little to no funding, you\'re the ones we want to help succeed the most! In many cases we support folks that either can\'t pay for website design, development or have little knowledge or time to build it themselves.',
    icon: webIcon,
    iconBgColor: 'magenta',
    iconAccentColor: 'red',
    button: {
      text: 'Apply for a free website!',
      href: '/contact',
    },
  },
  {
    title: 'Projects',
    content:
      'Do you have an idea that would help bring us closer to a vegan world? App? Book? Movie? Song? Activism? Event? Content? Let us know, we\'ll help get you the resources you need to get your idea off the ground, or if we really love the idea, we\'ll help build it for you, free!',
    icon: projectIcon,
    iconBgColor: 'green',
    iconAccentColor: 'green-dark',
    button: {
      text: 'Let\'s connect and discuss your idea!',
      href: '/contact',
    },
  },
  {
    title: 'Funding',
    content:
      'We\'re very happy to be able to offer up to $1000 USD in seed funding grants for oustanding, and effective, animal rights activism! Specifically we\'re looking for individual or grassroots groups whose primary purpose is to help reduce suffering for non-human farmed animals.',
    icon: fundingIcon,
    iconBgColor: 'yellow',
    iconAccentColor: 'yellow-dark',
    button: {
      text: 'Learn about our grant program!',
      href: '/grants',
    },
  },
  {
    title: 'Advice',
    content:
      'We have several advisors with a wide range of experience that can help! We\'ll happily advise any vegan activist or organization - whether that be for your technology, organizational structure, strategy, marketing, grant requests, and more! Feel free to get in touch with questions! ',
    icon: adviceIcon,
    iconBgColor: 'orange',
    iconAccentColor: 'orange-dark',
    button: {
      text: 'Ask for advice, contact us!',
      href: '/contact',
    },
  },
];

const Service: React.FC<ServiceProps> = ({
  title,
  content,
  icon,
  iconBgColor,
  iconAccentColor,
  align,
  button,
}) => {
  return (
    <div key={title}>
      <InfoBox
        key={title}
        title={title}
        icon={icon}
        iconBgColor={iconBgColor}
        iconAccentColor={iconAccentColor}
        align={align}
      >
        <p className="mt-3 mb-7">{content}</p>
        {button && (
          <DarkButton className="max-w-md" href={button.href}>
            {button.text}
          </DarkButton>
        )}
      </InfoBox>
    </div>
  );
};

const Services: React.FC = () => (
  <>
    <Head>
      <title>Services | Vegan Hacktivists</title>
    </Head>
    <div>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'Supporting the Animal Rights Movement',
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
      <FirstSubSection header="Our services">
        Aside from building our own projects, we also serve the greater
        community! If you’re an animal rights activist, organization, or just a
        vegan who needs help - let us know! Please keep in mind that while all
        of our services are free this unfortunately means we have to be
        selective with who we can help with our limited resources. Ask us either
        way!
      </FirstSubSection>
      <div className="flex flex-col md:space-y-20 items-center mx-auto drop-shadow-2xl text-2xl mb-20">
        {SERVICE_BLOCKS.map((service, index) => (
          <Service
            key={service.title}
            align={index % 2 === 0 ? 'left' : 'right'}
            {...service}
          />
        ))}
      </div>
    </div>
    <Sprite image={pig} />
  </>
);

export default Services;
