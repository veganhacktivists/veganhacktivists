import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Hero from '../components/decoration/hero';
import SquareField from '../components/decoration/squares';

import heroBackground from '../../public/images/services/VH-chick-hero.jpg';
import heroTagline from '../../public/images/services/VH-services-hero-text.png';
import adviceIcon from '../../public/images/services/Services-icon-advice.png';
import fundingIcon from '../../public/images/services/Services-icon-funding.png';
import projectIcon from '../../public/images/services/Services-icon-project.png';
import webIcon from '../../public/images/services/Services-icon-web.png';

import classNames from 'classnames';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const SERVICE_BLOCKS = [
  {
    title: 'Websites',
    content:
      'If you\'re a small vegan activist, organization, or business with little to no funding, you\'re the ones we want to help succeed the most! In many cases we support folks that either can\'t pay for website design, development or have little knowledge or time to build it themselves. We\'ll also take care of hosting using a dynamic dedicated server w/ Cloudflare protection and domain privacy',
    icon: webIcon,
    iconBgColor: 'magenta',
    iconAccentColor: 'red',
  },
  {
    title: 'Projects',
    content:
      'Do you have an idea that would help bring us closer to a vegan world? A new website? App? Book? Movie? Song? Activism? Event? Content? Let us know, we\'ll help get you the resources you need to get your idea off the ground, or if we love it, we\'ll help you build it using our resources and team',
    icon: projectIcon,
    iconBgColor: 'green',
    iconAccentColor: 'green-dark',
  },
  {
    title: 'Funding',
    content:
      'We\'re lucky enough to have a generous benefactor that allows us to fund vegan activists and small grassroot vegan organizations! Looking to start a cube of truth in your area? Interested in other types of street activism but need funding for vegan cupcakes, stickers, signs? What about support for camera gear, graphic design, development or transportation? Request funding!',
    icon: fundingIcon,
    iconBgColor: 'yellow',
    iconAccentColor: 'yellow-dark',
  },
  {
    title: 'Advice',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elit turpis. Nunc rhoncus nec sem nec tempor. Sed id finibus enim. Sed sollicitudin odio volutpat, fermentum nibh sed, vestibulum neque. Ut eu lectus at nibh consequat aliquam fermentum id velit.',
    icon: adviceIcon,
    iconBgColor: 'orange',
    iconAccentColor: 'orange-dark',
  },
];

enum ServiceCoverAlignment {
  LEFT,
  RIGHT,
}

interface ServiceProps {
  title: string;
  content: string;
  icon: StaticImageData;
  iconBgColor: string;
  iconAccentColor: string;
  align: ServiceCoverAlignment;
}

const Service: React.FC<ServiceProps> = ({
  title,
  content,
  icon,
  iconBgColor,
  iconAccentColor,
  align,
}) => {
  const rootClassnames = classNames(
    'flex w-full xl:w-3/5 m-auto group',
    { 'min-height': '300px' },
    { 'flex-row-reverse': align === ServiceCoverAlignment.RIGHT }
  );

  const iconWrapperClassnames = classNames(
    'flex-none hidden lg:block',
    `bg-${iconBgColor}`
  );

  const contentWrapperClassnames = classNames(
    'text-left p-4 bg-gray-background',
    { 'min-height': '300px' }
  );

  return (
    <div className={rootClassnames}>
      <div className={iconWrapperClassnames}>
        <div className="transition duration-150 opacity-0 group-hover:opacity-100">
          <SquareField
            squares={[{ color: iconAccentColor, size: 16, top: 0, right: 0 }]}
          />
        </div>
        <div className="p-10">
          <Image src={icon} alt={title} />
        </div>
      </div>
      <div className={contentWrapperClassnames}>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="my-3">{content}</p>
      </div>
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
        alignment="left"
        classNameMapping={{
          container: 'bg-center',
        }}
      >
        <div className="md:p-12">
          <Image
            src={heroTagline}
            width={heroTagline.width * 0.65}
            height={heroTagline.height * 0.65}
            alt="Compassion, Creativity, Code"
            quality={100}
            priority
          />
        </div>
      </Hero>
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="text-grey content-center mx-auto my-32 md:w-1/2 drop-shadow-2xl text-2xl">
        <h1 className="mb-16">
          <span className="font-italic text-3xl">Our </span>
          <b className="font-mono text-5xl uppercase">services</b>
        </h1>
      </div>
      <div className="flex flex-col space-y-20 items-center mx-auto drop-shadow-2xl text-2xl mb-20">
        {SERVICE_BLOCKS.map(
          ({ title, content, icon, iconBgColor, iconAccentColor }, index) => (
            <div key={title}>
              <Service
                key={title}
                title={title}
                content={content}
                icon={icon}
                iconBgColor={iconBgColor}
                iconAccentColor={iconAccentColor}
                align={
                  index % 2 === 0
                    ? ServiceCoverAlignment.LEFT
                    : ServiceCoverAlignment.RIGHT
                }
              />
            </div>
          )
        )}
      </div>
    </div>
  </>
);

export default Services;
