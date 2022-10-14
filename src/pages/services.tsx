import React from 'react';
import { NextSeo } from 'next-seo';

import Hero from '../components/decoration/hero';
import InfoBox from '../components/infoBox';
import SquareField from '../components/decoration/squares';
import Sprite, { pig } from '../components/decoration/sprite';
import ContactUsForm from '../components/forms/contactUs';
import { FirstSubSection } from '../components/decoration/textBlocks';
import { DarkButton } from '../components/decoration/buttons';
import CustomImage from '../components/decoration/customImage';
import heroBackground from '../../public/images/services/VH-chick-hero.jpg';
import heroTagline from '../../public/images/services/VH-services-hero-text.png';
import adviceIcon from '../../public/images/services/Services-icon-advice.png';
import fundingIcon from '../../public/images/services/Services-icon-funding.png';
import projectIcon from '../../public/images/services/Services-icon-project.png';
import webIcon from '../../public/images/services/Services-icon-web.png';
import designIcon from '../../public/images/services/Services-icon-design.png';
import PixelBulb from '../../public/images/VH_PixelBulb.png';

import type { StaticImageData } from 'next/image';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'green', size: 24, left: 16, bottom: 0 },
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
      "If you're an independent activist or organization with little to no funding, you're the ones we want to help. We support advocates that have few resources dedicated to website design, development, and/or have limited knowledge or time to build it themselves.",
    icon: webIcon,
    iconBgColor: 'magenta',
    iconAccentColor: 'red',
    button: {
      text: 'Apply for a free website',
      href: 'https://veganhacktivists.org/playground',
    },
  },
  {
    title: 'Design',
    content:
      "We have a dedicated team to help design your brand's identity, logo, social media assets, website design, and more. We collaborate with you to understand your core values, purpose, and goals, so that we can best curate your digital presence.",
    icon: designIcon,
    iconBgColor: 'yellow-dark',
    iconAccentColor: 'yellow-orange',
    button: {
      text: 'Apply for free design support',
      href: 'https://forms.gle/guiL6sLCJCDdy7Yy5',
    },
  },
  {
    title: 'Projects',
    content:
      "Do you have an idea that would help bring us closer to a vegan world? Whether it's an app, event, or media that you are interested in producing, we'll help get the resources you need to get your idea off the ground. If the concept is aligned with our work, we'd be happy to explore partnerships.",
    icon: projectIcon,
    iconBgColor: 'green',
    iconAccentColor: 'green-dark',
    button: {
      text: "Let's chat about your idea",
      href: '#contact-us',
    },
  },
  {
    title: 'Funding',
    content:
      "We offer up to $1,000 USD in seed funding grants for effective animal rights activism! We seek individual and grassroots groups whose primary purpose is to help reduce suffering for non-human farmed animals.",
    icon: fundingIcon,

    iconBgColor: 'yellow',
    iconAccentColor: 'yellow-dark',
    button: {
      text: 'Learn about our grant program',
      href: '/grants',
    },
  },
  {
    title: 'Advice',
    content:
      "Our advisory and core team members have a plethora of experience in tech, design, and nonprofit management. We are happy to advise individuals and organizations to the best of our abilities, whether it be technology, organizational strategy, marketing, or fundraising.",
    icon: adviceIcon,
    iconBgColor: 'orange',
    iconAccentColor: 'orange-dark',
    button: {
      text: 'Contact us for advice,
      href: '#contact-us',
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
          <DarkButton className="max-w-sm" href={button.href}>
            {button.text}
          </DarkButton>
        )}
      </InfoBox>
    </div>
  );
};

const Services: React.FC = () => (
  <>
    <NextSeo title="Services" />
    <div>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'Supporting the Animal Protection Movement',
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
        As capacity builders, we offer our skills and services to the animal
        protection movement. From development and design to content creation,
        volunteers, and operational advice, we&apos;re here to help elevate your
        work for the animals.
      </FirstSubSection>
      <div className="flex flex-col items-center mx-auto mb-20 text-2xl md:space-y-20">
        {SERVICE_BLOCKS.map((service, index) => (
          <Service
            key={service.title}
            align={index % 2 === 0 ? 'left' : 'right'}
            {...service}
          />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center w-full mx-auto mb-20 text-2xl gap-y-4 xl:w-3/5">
        <CustomImage
          src={PixelBulb}
          alt=""
          layout="fixed"
          height={PixelBulb.height / 3}
          width={PixelBulb.width / 3}
        />

        <div className="px-3 text-center text-grey-darker md:w-2/3">
          We do on ocassion offer paid services for activists and/or
          organizations that need dedicated or priority speed support. If you
          fit that criteria, please contact us below. Our pricing is based on
          your budget and is discounted for non-profits.
        </div>
      </div>
    </div>
    <Sprite image={pig} pixelsLeft={3} pixelsRight={1} />
    <SquareField
      squares={[
        { size: 16, color: 'grey-background', bottom: 0, left: 0 },
        { size: 16, color: 'white', top: 0, left: 32 },
        { size: 16, color: 'grey-background', bottom: 0, right: 0 },
        { size: 16, color: 'white', top: 0, right: 0 },
      ]}
      className="hidden md:block"
    />
    <div className="px-10 pt-10 bg-grey-background md:px-0">
      <div className="py-5 mx-auto text-xl md:w-1/2 text-grey-dark">
        If you&apos;d like to talk about any of these services, please use our
        contact form to get in touch! We do our best to respond to every email
        within 48 hours.
      </div>
      <ContactUsForm />
    </div>
  </>
);

export default Services;
