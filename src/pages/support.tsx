import React from 'react';
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import Hero from '../components/decoration/hero';
import heroBackground from '../../public/images/support/VH-pig2-hero-nocircles.jpg';
import heroTagline from '../../public/images/support/VH-support-hero-text.png';
import PayPalLogo from '../../public/images/support/paypal-logo.png';
import PatreonLogo from '../../public/images/support/patreon-logo.png';
import HeartLogo from '../../public/images/support/heart-icon.png';
import PixelHeart from '../../public/images/VH_PixelHeart.png';
import Sprite, { pig, chicken } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { PlainHeader } from '../components/decoration/textBlocks';
import { LightButton } from '../components/decoration/buttons';
import PatreonSupporters from '../components/layout/support/patreonSupporters';
import JoinOurTeam from '../components/layout/support/joinOurTeam';
import { getPatrons } from '../lib/patreon';
import useThemeColor from '../hooks/useThemeColor';
import CustomImage from '../components/decoration/customImage';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'green', size: 16, lwft: 0, top: 0 },

  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const DonationCard: React.FC<{
  title: string;
  buttonText: string;
  buttonHref: string;
  color: string;
  image: StaticImageData;
  large?: boolean;
}> = ({ title, buttonText, buttonHref, image, color, large, children }) => {
  const backgroundColor = useThemeColor(color);

  return (
    <div
      style={{
        width: `${large ? '400px' : '300px'}`,
        height: `${large ? '540px' : '400px'}`,
      }}
      className="flex-col mx-5 mb-5 bg-gray-lighter"
    >
      <div style={{ backgroundColor }}>
        <div className={'absolute w-8 h-8 transparent'} />
        <div className="p-12">
          <CustomImage
            src={image.src}
            width={image.width / 3}
            height={image.height / 3}
            alt="Our community"
          />
        </div>
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold pb-5 font-mono">{title}</h1>
        <p className="text-xl mx-auto mb-8">{children}</p>
        <LightButton href={buttonHref}>{buttonText}</LightButton>
      </div>
    </div>
  );
};

const Paragraph: React.FC = ({ children }) => (
  <p className="text-xl md:w-3/4 mx-auto mb-20 px-10">{children}</p>
);

const Support: React.FC<{ patrons: string[] }> = ({ patrons }) => {
  return (
    <>
      <Head>
        <title>Support us | Vegan Hacktivists</title>
      </Head>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'You are their voice',
        }}
        alignment="left"
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="px-10">
        <PlainHeader header="Support Us">
          With your gift, we can make a greater and real impact to help change
          the world for our animal friends. Thank you.
        </PlainHeader>
        <Paragraph>
          Thank you so much for considering supporting us! We are a 100% vegan
          volunteer team that builds technology for the animal rights movement
          while supporting organizations and individual activists. We do this
          for the animals - we do this because coding is our way of doing our
          part for activism. If you believe in the work we do and want to
          support us, please consider supporting us with a donation! It means
          the world to us and the animals to have your support.
        </Paragraph>
      </div>
      <div className="flex flex-wrap justify-center items-end mb-16 mt-16">
        <DonationCard
          color="blue"
          image={PayPalLogo}
          title="PayPal"
          buttonText="donate"
          buttonHref="https://paypal.me/davidvanbeveren"
        >
          For one-time, smaller donations
        </DonationCard>
        <DonationCard
          color="orange"
          image={PatreonLogo}
          title="Patreon"
          buttonText="become a patron"
          buttonHref="https://www.patreon.com/veganhacktivists"
          large
        >
          Become a monthly supporter for as little as $5 a month!
        </DonationCard>
        <DonationCard
          color="green"
          image={HeartLogo}
          title="Other"
          buttonText="contact us"
          buttonHref="mailto:hello@veganhacktivists.org"
        >
          For tax-deductible (U.S.), larger donations
        </DonationCard>
      </div>
      <Paragraph>
        We prefer a{' '}
        <span className="font-bold">monthly donation via Patreon</span> as that
        gives us the most stability every month, but we also accept one time
        donations via Paypal. If you would like to make a larger contribution of
        $1000 or more (thank you!) please contact us for other options like wire
        or check. We have a fiscal sponsor that will let you claim your donation
        as tax deductable!
      </Paragraph>
      <SquareField
        squares={[
          { color: 'gray-background', size: 16, bottom: 0, left: 0 },
          { color: 'gray-background', size: 16, bottom: 0, right: 0 },
          { color: 'white', size: 16, top: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <Sprite image={pig} pixelsLeft={1} pixelsRight={1} />
      <div className="pt-10 pb-20 mx-auto px-10 bg-gray-background">
        <CustomImage
          src={PixelHeart.src}
          width={PixelHeart.width / 3}
          height={PixelHeart.height / 3}
          alt="Our community"
        />

        <h2 className="mb-8 text-4xl font-bold">Thank You</h2>
        <Paragraph>
          Thank you so much for your donation. We want to take a moment to thank
          the people below for their continued support - for those who have
          awarded us grants or contributed large donations - both one-time and
          reoccurring. We cannot begin to describe how grateful we are and we
          would not be able to do the work we do without you.
        </Paragraph>
        <PatreonSupporters patrons={patrons} />
      </div>
      <SquareField
        squares={[
          { color: 'white', size: 16, top: 0, left: 0 },
          { color: 'grey-light', size: 16, bottom: 0, left: 0 },
          { color: 'grey-light', size: 16, bottom: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <JoinOurTeam />
      <Sprite image={chicken} pixelsLeft={2} pixelsRight={0} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const patrons = await getPatrons();

  return {
    props: {
      patrons,
    },
    revalidate: 480,
  };
};

export default Support;
