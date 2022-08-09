import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';

// TODO: get the image without the circles
import { useSession } from 'next-auth/react';
import React from 'react';

import heroImage from '../../../../public/images/playground/hero.jpg';
import tagline from '../../../../public/images/playground/getsupportfrom.svg';

import Hero from 'components/decoration/hero';
import { DarkButton, OutlineButton } from 'components/decoration/buttons';

import type { Layout } from 'types/persistentLayout';

const PlaygroundLayout: Layout = ({ children }) => {
  // TODO: put the real tagline here, stop messing up the padding
  return (
    <>
      <NextSeo titleTemplate="%s | VH Playground" />
      <div className="">
        <Hero
          imageBackground={heroImage}
          tagline={{
            alt: 'Get Support from Playground',
            image: tagline,
          }}
          alignment="left"
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
