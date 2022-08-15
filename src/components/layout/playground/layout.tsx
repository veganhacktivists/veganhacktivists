import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';

// TODO: get the image without the circles
import { useSession } from 'next-auth/react';
import React from 'react';

import heroFishImage from '../../../../public/images/playground/fishHero.png';
import heroCrabImage from '../../../../public/images/playground/crabHero.jpg';
import submitTagline from '../../../../public/images/playground/getsupport.svg';
import volunteerTagline from '../../../../public/images/playground/volunteer.svg';
import discord from '../../../../public/images/yearInReview/2021/discord.png';

import SquareField from '../../decoration/squares';

import AdminCallout from './adminCallout';

import FaqSection from './faqSection';

import Hero from 'components/decoration/hero';
import { DarkButton, OutlineButton } from 'components/decoration/buttons';

import CustomImage from 'components/decoration/customImage';

import type { Layout } from 'types/persistentLayout';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const PlaygroundLayout: Layout = ({ children }) => {
  const router = useRouter();
  const isSupportPage =
    router.pathname === '/playground' ||
    router.pathname === '/playground/submit';

  // TODO: put the real tagline here, stop messing up the padding
  return (
    <>
      <NextSeo titleTemplate="%s | VH Playground" />
      <div>
        <Hero
          imageBackground={isSupportPage ? heroFishImage : heroCrabImage}
          tagline={{
            alt: isSupportPage
              ? 'Get Support from Playground'
              : 'Volunteer for the Animals',
            image: isSupportPage ? submitTagline : volunteerTagline,
            imageWidth: 380,
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
      </div>
      {children}
      {/* <div className="pb-10"> */}
      <FaqSection />
      {/* </div> */}
      <SquareField
        className="hidden md:block"
        squares={[
          { color: '#949494', size: 16, left: 0, top: 0 },
          { color: '#B6B6B6', size: 16, left: 16, top: 0 },
          { color: '#B3B3B3', size: 28, right: 0, top: 0 },
          { color: '#D9D9D9', size: 14, right: 28, top: 0 },
        ]}
      />
      <div className="py-10">
        <div className="font-mono text-3xl font-bold capitalize text-grey">
          Stay updated, join our community!
        </div>
        <div className="flex flex-col justify-center gap-5 mx-auto md:flex-row md:w-2/3 lg:w-1/2">
          <div className="p-5 space-y-2 bg-grey-background">
            <div className="w-32 mx-auto">
              <CustomImage src={discord} alt="Discord logo" />
            </div>
            <div className="text-xl text-grey">
              Join our vegan volunteer Discord community and meet others in
              Playground!
            </div>
            <DarkButton href="/joinplayground">Join</DarkButton>
          </div>
          {/* <div>
            <Newsletter />
          </div> */}
        </div>
      </div>
    </>
  );
};

export const PlaygroundLandingLayout: Layout = ({ children }) => {
  const router = useRouter();
  const showRequests = router.pathname === '/playground';
  const { data: session, status } = useSession();

  return (
    <PlaygroundLayout>
      <div>
        {status === 'authenticated' && session.user?.role === 'Admin' && (
          <AdminCallout />
        )}
        <div className="flex flex-col justify-center w-2/3 gap-8 mx-auto my-10 md:flex-row">
          <OutlineButton
            capitalize={false}
            className="w-full uppercase"
            active={showRequests}
            href="/playground"
            linkProps={{ scroll: false }}
          >
            View requests
          </OutlineButton>
          <OutlineButton
            capitalize={false}
            className="w-full uppercase"
            active={!showRequests}
            href="/playground/submit"
            linkProps={{ scroll: false }}
          >
            Submit a request
          </OutlineButton>
        </div>
        {children}
      </div>
    </PlaygroundLayout>
  );
};

export default PlaygroundLayout;
