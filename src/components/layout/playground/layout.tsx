import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import React from 'react';
import classNames from 'classnames';
import { UserRole } from '@prisma/client';

import heroFishImage from '../../../../public/images/playground/fishHero.png';
import heroCrabImage from '../../../../public/images/playground/crabHero.jpg';
import submitTagline from '../../../../public/images/playground/getsupport.svg';
import volunteerTagline from '../../../../public/images/playground/volunteer.svg';
import discord from '../../../../public/images/yearInReview/2021/discord.png';
import animalAdvocacyCareers from '../../../../public/images/playground/animal-advocacy-careers.png';
import SquareField from '../../decoration/squares';
import checkmarkIcon from '../../../../public/images/playground/icons/checkmark.svg';
import heartIcon from '../../../../public/images/playground/icons/heart.svg';
import resumeIcon from '../../../../public/images/playground/icons/resume.svg';
import clockIcon from '../../../../public/images/playground/icons/clock.svg';

import FaqSection from './faqSection';

import Hero from 'components/decoration/hero';
import { DarkButton, OutlineButton } from 'components/decoration/buttons';
import CustomImage from 'components/decoration/customImage';
import { trpc } from 'lib/client/trpc';
import Spinner from 'components/decoration/spinner';
import { JOIN_PLAYGROUND_URL } from 'lib/discord/constants';

import type { NextSeoProps } from 'next-seo';
import type { Layout } from 'types/persistentLayout';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const playgroundSEO: NextSeoProps = {
  titleTemplate: '%s | VH Playground',
  openGraph: {
    images: [
      {
        url: 'https://veganhacktivists.org/images/playground/VH_Playground_FullLogoWithBackground.png',
        alt: 'VH Playground logo',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PlaygroundLayout: Layout = ({ children }) => {
  const router = useRouter();
  const isSupportPage =
    router.pathname === '/playground' ||
    router.pathname === '/playground/submit';

  return (
    <>
      <NextSeo {...playgroundSEO} />
      <div>
        <Hero
          imageBackground={isSupportPage ? heroFishImage : heroCrabImage}
          tagline={{
            alt: isSupportPage
              ? 'Get Support from Playground'
              : 'Volunteer for the Animals',
            image: isSupportPage ? submitTagline : volunteerTagline,
            imageWidth: 380,
            biggerOnMobile: true,
          }}
          alignment="left"
          imageAlignment="right"
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
      <div className="py-20 px-5 md:px-0">
        <div className="flex flex-col sm:flex-row flex-grow md:w-2/3 2xl:w-1/2 mx-auto gap-10">
          <div className="w-full sm:w-1/2 flex flex-grow">
            <div className="relative w-full max-w-[500px]">
              <SquareField
                squares={[
                  { color: 'orange-light', top: 0, right: 0, size: 10 },
                ]}
              />
              <div className="bg-yellow-orange p-10 2xl:p-20">
                <CustomImage
                  layout="responsive"
                  alt="Animal Advocacy Careers"
                  src={animalAdvocacyCareers}
                />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="text-left">
              <span className="block text-3xl font-bold font-mono pb-5">
                Looking for a job or career in animal advocacy?
              </span>
              <span className="block text-xl">
                Check out Animal Advocacy&apos;s job board which connects you to
                exciting animal nonprofit jobs with high potential for helping
                animals.
              </span>
              <div className="flex mt-5">
                <DarkButton href="https://www.animaladvocacycareers.org/?ref=veganhacktivists.org">
                  Explore Careers
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FaqSection
        design={
          router.pathname === '/playground/submit'
            ? 'dark'
            : router.pathname === '/playground'
            ? undefined
            : 'light'
        }
      />
      <SquareField
        className="hidden md:block"
        squares={[
          { color: '#949494', size: 16, left: 0, top: 0 },
          { color: '#B6B6B6', size: 16, left: 16, top: 0 },
          { color: '#B3B3B3', size: 28, right: 0, top: 0 },
          { color: '#D9D9D9', size: 14, right: 28, top: 0 },
        ]}
      />
      <div
        className={classNames({
          dark: router.pathname === '/playground/request/[id]',
        })}
      >
        <div className="py-10 pt-5 pb-10 dark:bg-grey">
          <div className="mt-10 mb-8 font-mono text-3xl font-bold capitalize text-grey">
            Volunteer? Join our community!
          </div>
          <div className="flex flex-col justify-center gap-5 mx-auto mb-8 md:flex-row md:w-2/3 lg:w-1/2">
            <div
              className={classNames(
                'pt-8 pb-8 p-5 space-y-2 bg-grey-background'
              )}
            >
              <div className="w-32 mx-auto">
                <CustomImage src={discord} alt="Discord logo" />
              </div>
              <div className="pt-4 pb-4 text-xl text-grey">
                Are you a developer, designer, or have other skills to
                contribute for animals? Join our vegan volunteer Discord
                community and meet others in Playground!
              </div>
              <DarkButton newTab href={JOIN_PLAYGROUND_URL}>
                Join us on Discord
              </DarkButton>
            </div>
            {/* <div>
            <Newsletter />
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const PlaygroundStat: React.FC<{
  label: string;
  value?: number;
  icon: typeof clockIcon;
}> = ({ label, icon, value }) => {
  return (
    <div className="flex flex-col justify-center gap-5 mx-auto lg:flex-row place-items-center w-fit">
      <CustomImage src={icon} alt="" />
      <div className="w-3/4 lg:w-1/2 font-mono text-center lg:text-left">
        <div className="text-3xl font-bold leading-none">
          {value ?? <Spinner />}
        </div>
        <div className="text-2xl font-light leading-none capitalize">
          {label}
        </div>
      </div>
    </div>
  );
};

export const PlaygroundStats = ({
  skipOpenRequests = false,
}: {
  skipOpenRequests?: boolean;
}) => {
  const { data } = trpc.playground.getPlaygroundStats.useQuery(undefined, {
    staleTime: 10000,
  });
  return (
    <>
      {!skipOpenRequests && (
        <PlaygroundStat
          label="Open requests"
          icon={resumeIcon}
          value={data?.requestsOpen}
        />
      )}
      <PlaygroundStat
        label="Requests supported"
        value={data?.requestsSupported}
        icon={checkmarkIcon}
      />
      <PlaygroundStat
        label="Playground volunteers"
        value={data?.numberOfVolunteers || undefined}
        icon={heartIcon}
      />
      <PlaygroundStat
        label="Hours volunteered"
        value={data?.hoursVolunteered}
        icon={clockIcon}
      />
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
        <div className="py-2 mb-20 bg-grey-background">
          <div className="grid justify-center mx-auto mt-8 md:mt-24 mb-8 md:mb-16 grid-cols-2 md:grid-cols-4 gap-y-5 w-fit text-gray">
            <PlaygroundStats />
          </div>
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
            {status === 'authenticated' &&
              session.user?.role === UserRole.Admin && (
                <DarkButton
                  className="w-full uppercase"
                  href="/playground/admin"
                >
                  Admin
                </DarkButton>
              )}
          </div>
        </div>

        {children}
      </div>
    </PlaygroundLayout>
  );
};

export default PlaygroundLayout;
