import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';

// TODO: get the image without the circles
import heroImage from '../../../../public/images/playground/hero.jpg';

import Hero from 'components/decoration/hero';

import { OutlineButton } from 'components/decoration/buttons';

import { useSessionQuery } from 'lib/client/api/hooks/session';

import type { Layout } from 'types/persistentLayout';

const PlaygroundLayout: Layout = ({ children }) => {
  const router = useRouter();
  const showRequests = router.pathname === '/playground';

  const { data: session, isFetched } = useSessionQuery();

  // TODO: put the real tagline here, stop messing up the padding
  return (
    <>
      <NextSeo titleTemplate="%s | VH Playground" />
      <div className="">
        <Hero
          imageBackground={heroImage}
          // tagline={{
          //   alt: 'Get Support from Playground',
          // image: null,
          // }}
          alignment="left"
        >
          <div className="p-10 text-white py-28">
            <div className="text-5xl font-italic">
              <div>
                <span>Get</span>{' '}
                <span className="font-mono font-light uppercase">support</span>{' '}
                <span>from</span>
              </div>
              <div className="font-mono uppercase text-7xl">Playground</div>
            </div>
            <div className="text-2xl font-italic">
              Our Vegan Volunteer community
            </div>
          </div>
        </Hero>
      </div>
      {isFetched && session?.user && (
        <div>
          Logged in as {session.user.name} ({session.user.email})
        </div>
      )}
      <div className="flex flex-col w-2/3 gap-8 mx-auto my-10 md:flex-row">
        <OutlineButton
          capitalize={false}
          className="w-full uppercase"
          active={showRequests}
          onClick={() => {
            void router.replace('/playground', undefined, {
              scroll: false,
              // shallow: true,
            });
          }}
        >
          View requests
        </OutlineButton>
        <OutlineButton
          capitalize={false}
          className="w-full uppercase"
          active={!showRequests}
          onClick={() => {
            void router.replace('/playground/submit', '/playground', {
              scroll: false,
              // shallow: true,
            });
          }}
        >
          Submit a request
        </OutlineButton>
      </div>
      {children}
    </>
  );
};

export default PlaygroundLayout;
