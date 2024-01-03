import React from 'react';
import { NextSeo } from 'next-seo';

import HeartLogo from '../../public/images/support/heart-icon.png';
import PayPalLogo from '../../public/images/support/paypal-logo.png';
import heroBackground from '../../public/images/support/VH-pig2-hero-nocircles.jpg';
import heroTagline from '../../public/images/support/VH-support-hero-text.png';
import Hero from '../components/decoration/hero';
import Sprite, { pig } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { PlainHeader } from '../components/decoration/textBlocks';
import CustomLink from '../components/decoration/link';
import DonationCard from '../components/layout/support/donationCard';
import Crypto from '../components/layout/support/crypto';
import DonorBoxCard from '../components/layout/support/donorBoxCard';

import ThankYouSection from 'components/layout/support/thankYouSection';
import VioletStudios from 'components/layout/support/violetStudios';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'green', size: 16, lwft: 0, top: 0 },

  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="px-10 mx-auto mb-20 text-xl md:w-3/4">{children}</p>
);

const Support: React.FC = () => {
  return (
    <>
      <NextSeo title="Support Us" />
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
          If you believe in the work we do and would like to support us, please
          consider making a donation. With your gift, we can make a greater
          impact and change the world for our animal friends.
        </PlainHeader>
      </div>
      <div className="mx-auto my-16 md:w-fit">
        <div className="flex flex-wrap items-end justify-center gap-10 mb-5">
          <DonationCard
            color="blue"
            image={PayPalLogo}
            title="PayPal"
            buttonText="donate"
            buttonHref="https://paypal.me/veganhacktivists"
          >
            For one-time, smaller donations
          </DonationCard>
          <DonorBoxCard color="orange" large />
          <DonationCard
            color="green"
            image={HeartLogo}
            title="Other"
            buttonText="contact us"
            buttonHref="https://veganhacktivists.org/contact"
          >
            For larger donations (US tax-deductible)
          </DonationCard>
        </div>
        <div className="">
          <Crypto />
        </div>
      </div>

      <Paragraph>
        We prefer a{' '}
        <span className="font-bold">monthly donation via Donorbox</span> as that
        gives us the most stability, but we also appreciate one-time donations!
        If you would like to make a larger contribution of $1,000 or more
        (thanks!), please{' '}
        <CustomLink href="https://veganhacktivists.org/contact">
          contact us
        </CustomLink>{' '}
        for tax deductible options via our fiscal sponsor.
      </Paragraph>
      <SquareField
        squares={[
          { color: 'gray-background', size: 16, bottom: 0, left: 16 },
          { color: 'gray-background', size: 16, bottom: 0, right: 0 },
          { color: 'white', size: 16, top: 0, left: 0 },
          { color: 'white', size: 16, top: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <VioletStudios />
      <SquareField
        squares={[
          { color: 'gray', size: 16, bottom: 0, right: 16 },
          { color: '#BCBCBC', size: 16, top: 0, left: 0 },
          { color: 'black', size: 16, top: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <ThankYouSection />
      <SquareField
        squares={[{ color: 'grey-light', size: 16, bottom: 0, left: 0 }]}
        className="hidden md:block"
      />
      <Sprite image={pig} pixelsLeft={1} pixelsRight={1} />
    </>
  );
};

export default Support;
