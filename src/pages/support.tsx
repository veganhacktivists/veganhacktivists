import React from 'react';
import { NextSeo } from 'next-seo';

import HeartLogo from '../../public/images/support/heart-icon.png';
import PayPalLogo from '../../public/images/support/paypal-logo.png';
import heroBackground from '../../public/images/support/VH-pig2-hero-nocircles.jpg';
import heroTagline from '../../public/images/support/VH-support-hero-text.png';
import { ExternalLinkButton } from '../components/decoration/buttons';
import CustomImage from '../components/decoration/customImage';
import Hero from '../components/decoration/hero';
import Sprite, { chicken, pig } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { PlainHeader } from '../components/decoration/textBlocks';
import JoinOurTeam from '../components/layout/support/joinOurTeam';
import PatreonSupporters from '../components/layout/support/patreonSupporters';
import ProgressBar from '../components/layout/support/progressBar';
import { getPatreonFundig, getPatrons } from '../lib/patreon';
import CustomLink from '../components/decoration/link';
import { pixelHeart } from '../images/separators';
import DonationCard from '../components/layout/support/donationCard';
import Crypto from '../components/layout/support/crypto';
import DonorBoxCard from '../components/layout/support/donorBoxCard';

import type { GetStaticProps } from 'next';

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

const Support: React.FC<{ patrons: string[]; patreonFunding: number }> = ({
  patrons,
  patreonFunding,
}) => {
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
            buttonHref="https://paypal.me/davidvanbeveren"
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
      <Sprite image={pig} pixelsLeft={1} pixelsRight={1} />
      <div className="py-16 bg-grey-darker">
        <h2 className="mb-8 text-4xl font-bold text-white">
          Monthly Patreon Goals
        </h2>
        <Paragraph>
          <span className="text-white">
            See our Patreon goals below, and help us grow and be more effective!
          </span>
        </Paragraph>
        <ProgressBar currentAmount={patreonFunding} goal={5000} />
        <div className="flex justify-center mt-16">
          <ExternalLinkButton
            href="https://www.patreon.com/veganhacktivists"
            className="font-mono text-xl font-bold text-white"
            capitalize={false}
          >
            <div className="px-4">Donate Now</div>
          </ExternalLinkButton>
        </div>
      </div>
      <SquareField
        squares={[
          { color: 'gray-background', size: 16, bottom: 0, left: 0 },
          { color: 'gray-background', size: 16, bottom: 0, right: 0 },
          { color: 'white', size: 16, top: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <div className="px-10 pt-10 pb-20 mx-auto bg-gray-background">
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Our community"
        />

        <h2 className="mb-8 text-4xl font-bold">Thank You</h2>
        <Paragraph>
          We want to take a moment to thank the people below for their
          support—for those who have awarded us grants or contributed donations,
          whether one-time or recurring. We are grateful for your belief in our
          vision and support for our work.
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
  const [patrons, patreonFunding] = await Promise.all([
    getPatrons(),
    getPatreonFundig('USD'),
  ]);

  return {
    props: {
      patrons,
      patreonFunding,
    },
    revalidate: 480,
  };
};

export default Support;
