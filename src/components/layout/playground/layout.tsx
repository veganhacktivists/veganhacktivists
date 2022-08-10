import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';

// TODO: get the image without the circles
import { useSession } from 'next-auth/react';
import React from 'react';

import heroFishImage from '../../../../public/images/playground/fishHero.jpg';
import heroCrabImage from '../../../../public/images/playground/crabHero.jpg';
import submitTagline from '../../../../public/images/playground/getsupport.svg';
import volunteerTagline from '../../../../public/images/playground/volunteer.svg';

import SquareField from '../../decoration/squares';

import Hero from 'components/decoration/hero';
import { DarkButton, OutlineButton } from 'components/decoration/buttons';

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
          <div className="py-5 mx-auto w-fit">
            <div>You&apos;re an admin!</div>
            <DarkButton href="/playground/admin" className="">
              Enter review mode
            </DarkButton>
          </div>
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
