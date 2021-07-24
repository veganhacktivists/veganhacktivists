import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import heroBackground from '../../public/images/VH-chick-hero.jpg';
import heroTagline from '../../public/images/VH-services-hero-text.png';
import Hero from '../components/decoration/hero';
import SquareField from '../components/decoration/squares';

// TODO: Temporarily using this to fill in something for the service images
import activistHubCover from '../../public/images/projects/ActivistHub.png';

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
    cover: activistHubCover,
  },
  {
    title: 'Projects',
    content:
      'Do you have an idea that would help bring us closer to a vegan world? A new website? App? Book? Movie? Song? Activism? Event? Content? Let us know, we\'ll help get you the resources you need to get your idea off the ground, or if we love it, we\'ll help you build it using our resources and team',
    cover: activistHubCover,
  },
  {
    title: 'Funding',
    content:
      'We\'re lucky enough to have a generous benefactor that allows us to fund vegan activists and small grassroot vegan organizations! Looking to start a cube of truth in your area? Interested in other types of street activism but need funding for vegan cupcakes, stickers, signs? What about support for camera gear, graphic design, development or transportation? Request funding!',
    cover: activistHubCover,
  },
  {
    title: 'Advice',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elit turpis. Nunc rhoncus nec sem nec tempor. Sed id finibus enim. Sed sollicitudin odio volutpat, fermentum nibh sed, vestibulum neque. Ut eu lectus at nibh consequat aliquam fermentum id velit.',
    cover: activistHubCover,
  },
];

enum ServiceCoverAlignment {
  LEFT,
  RIGHT,
}

interface ServiceProps {
  title: string;
  content: string;
  cover: StaticImageData;
  align: ServiceCoverAlignment;
}

const Service: React.FC<ServiceProps> = ({ title, content, cover, align }) => {
  const coverImage = <Image src={cover} alt={title} width={250} height={250} />;

  return (
    <div className="flex space-x-8 content-center bg-gray-background">
      {align === ServiceCoverAlignment.LEFT ? coverImage : null}
      <div className="text-left m-6" style={{ width: 700 }}>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="my-3">{content}</p>
      </div>
      {align === ServiceCoverAlignment.RIGHT ? coverImage : null}
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
        {SERVICE_BLOCKS.map(({ title, content, cover }, index) => (
          <Service
            key={title}
            title={title}
            content={content}
            cover={cover}
            align={
              index % 2 === 0
                ? ServiceCoverAlignment.LEFT
                : ServiceCoverAlignment.RIGHT
            }
          />
        ))}
      </div>
    </div>
  </>
);

export default Services;
