import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import Hero from '../components/decoration/hero';
import heroBackground from '../../public/images/review2020/VH-Hero-review.jpg';
import heroTagline from '../../public/images/review2020/VH-Hero-text-review.png';
import SquareField from '../components/decoration/squares';

import Strawberry from '../../public/images/review2020/icon-strawberry-outline.png';
import Blueberry from '../../public/images/review2020/icon-blueberry-outline.png';

import {
  FirstSubSection,
  SubSection,
} from '../components/decoration/textBlocks';
import pixelHeart from '../../public/images/VH_PixelHeart.png';
import pixelFlower from '../../public/images/VH_PixelFlower.png';
import pixelStar from '../../public/images/VH_PixelStar.png';
import pixelPig from '../../public/images/VH_PixelPig.png';
import petaLogo from '../../public/images/review2020/peta.webp';
import beyondLogo from '../../public/images/review2020/beyondanimal.webp';
import counterglowLogo from '../../public/images/review2020/counterglow.webp';
import { HighlightBlock } from '../components/layout/review2020/highlightBlock';
import { HighlightedProjects } from '../components/layout/review2020/highlightedProjects';
import { Organizations } from '../components/layout/review2020/organizations';
import { DarkButton } from '../components/decoration/buttons';
import Sprite, { cow } from '../components/decoration/sprite';
import { animated, useSpring } from '@react-spring/web';
import { Waypoint } from 'react-waypoint';
import useReduceMotion from '../hooks/useReduceMotion';
import TopPosts from '../components/layout/review2020/topPosts';
import type { GetStaticProps } from 'next';
import type {
  IBlogEntry,
  IBlogEntryFields,
} from '../types/generated/contentful';
import { getContents } from '../lib/cms';
import CustomImage from '../components/decoration/customImage';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'green', size: 32, left: 16, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },

  { color: 'red', size: 32, right: 0, top: -16 },
  { color: 'orange', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const STRATEGY_DECORATION_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, top: 0 },
];

const NEW_TEAM_SQUARES = [
  { color: 'grey', size: 16, left: 0, bottom: 0 },
  { color: 'grey-light', size: 16, left: 0, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
];

const MINOR_CHANGES_SQUARES = [
  { color: 'grey-background', size: 16, left: 0, top: 0 },
  { color: 'white', size: 16, right: 0, bottom: 0 },
  { color: 'grey-background', size: 16, right: 0, top: 0 },
];

const PROJECT_SQUARES = [
  { color: 'grey-dark', size: 16, left: 0, bottom: 0 },
  { color: 'grey-light', size: 16, left: 0, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
];

const ORGANIZATIONS_SQUARES = [
  { color: 'grey-background', size: 16, bottom: 0, left: 0 },
  { color: 'white', size: 16, top: 0, left: 32 },

  { color: 'grey-background', size: 16, bottom: 0, right: 0 },
  { color: 'white', size: 16, top: 0, right: 0 },
];

const FINAL_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'grey-background', size: 16, right: 0, top: 0 },
  { color: 'white', size: 16, right: 16, bottom: 0 },
];

const AnimatedNumber: React.FC<{ number: number; approx?: boolean }> = ({
  number,
  approx = false,
}) => {
  const [onView, setOnView] = useState<boolean>(false);

  const prefersReducedMotion = useReduceMotion();

  const { number: interpolatedNumber } = useSpring({
    from: { number: 0 },
    to: { number },
    config: { duration: prefersReducedMotion ? 0 : 500 },
    cancel: !onView,
  });

  return (
    <>
      <Waypoint
        onEnter={() => {
          setOnView(true);
        }}
      />
      <span className="text-7xl xl:text-8xl" aria-label={`${number}`}>
        <animated.span>
          {interpolatedNumber.to((x) =>
            Math.floor(x)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          )}
        </animated.span>
        {approx && <>~</>}
      </span>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const slugs = [
    'covid-19-self-isolating-try-vegan',
    'why-a-global-pandemic-is-closely-tied-to-animal-agriculture',
    'the-problem-with-strays',
    'this-is-the-time-for-veganism-to-go-back-to-its-roots',
    'my-octopus-teacher-2020-step-into-nature-and-develop-a-gentleness',
    'dont-fall-for-clickbait-how-online-articles-misrepresent-veganism',
    'veganism-tour-around-the-world-what-does-veganism-look-like-in-other-countries',
    'eating-vegan-does-not-mean-losing-your-favorite-foods-only-changing-them',
  ];

  const topBlogs = await getContents<IBlogEntryFields>({
    contentType: 'blogEntry',
    query: {
      filters: {
        in: {
          slug: slugs,
        },
      },
    },
    other: { select: ['fields.slug', 'fields.title'] },
  });

  const ordered = topBlogs.sort(
    (a, b) => slugs.indexOf(a.fields.slug) - slugs.indexOf(b.fields.slug)
  );

  return { props: { topBlogs: ordered } };
};

interface YearInReviewProps {
  topBlogs: IBlogEntry[];
}

const YearInReview: React.FC<YearInReviewProps> = ({ topBlogs }) => {
  return (
    <>
      <Head>
        <title>2020 in Review | Vegan Hacktivists</title>
      </Head>
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: '2020 year in review',
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
      <FirstSubSection header="Our 2020 year in review" firstWordsNum={2}>
        We&apos;re so happy to release our 2020 year in review! Scroll down to
        see all our accomplishments we&apos;ve made thanks to your generous
        support, our partners, and most of all our amazing volunteers!
      </FirstSubSection>
      <CustomImage
        src={pixelHeart.src}
        height={pixelHeart.height / 3}
        width={pixelHeart.width / 3}
        alt=""
      />
      <SubSection
        header="We grew a lot as a community"
        headerSize="3xl"
        contentSize="2xl"
      >
        This year, we worked with some amazing vegan organizations, helped a lot
        of people with their advocacy, and had a blast building interesting
        projects for the movement. Our team almost grew three fold and there
        were a lot of new challenges that came with that growth, but we&apos;re
        really happy with what we accomplished and we can&apos;t wait to see
        what 2021 brings for us!
      </SubSection>
      <div className="h-12" />
      <HighlightBlock
        borderColor="magenta"
        headerStart="WE LAUNCHED"
        headerBold="EIGHT PROJECTS"
        headerEnd="FOR THE MOVEMENT"
      >
        Four of which were unique project ideas of our own! We were also luck
        enough to work on projects with Animal Rebellion, Animal Save Movement,
        Lebanese Vegans, and the Excelsior 4!
      </HighlightBlock>
      <HighlightBlock
        borderColor="yellow"
        headerStart="WE EXPANDED OUR TEAM FROM"
        headerBold="28 TO 80 VOLUNTEERS"
      >
        We expanded from just 3 teams of 28 volunteers to 7 teams of 80
        volunteers! We were able to open up more positions including content
        creators, animators, social, marketing, and advertising!
      </HighlightBlock>
      <HighlightBlock
        borderColor="green"
        headerStart="WE NOW HAVE AN"
        headerBold="ADVISORY TEAM"
        headerEnd="OF VEGAN EXPERTS"
      >
        We&apos;re incredibly thankful to now have a team of experienced vegan
        advisors to lean on such as Seb Alex, Ryuji Chua, Leah Doellinger and
        Michael Dearborn. Browse more of our advisors,{' '}
        <Link href="https://veganhacktivists.org/people/advisors">
          <a className="text-magenta hover:underline active:text-magenta-light">
            click here!
          </a>
        </Link>{' '}
      </HighlightBlock>
      <div className="h-16" />
      <SquareField
        squares={STRATEGY_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="bg-gray-background py-8">
        <CustomImage
          src={pixelFlower.src}
          height={pixelFlower.height / 3}
          width={pixelFlower.width / 3}
          alt=""
        />
        <SubSection
          header="Strategy and experimentation"
          headerSize="3xl"
          contentSize="2xl"
          spacing={4}
        >
          Like 2019, we focused on building projects with little data on whether
          those projects would succeed. We consider this a high-risk strategy as
          we use hundreds of hours volunteer time on these experimental
          projects.
        </SubSection>
        <SubSection contentSize="2xl">
          We&apos;re thankful this worked last year as 3 of the 6 projects we
          built met our standards of success, so we continued with this
          methodology. We firmly believe it&apos;s important for any movement to
          innovate, try new tactics, build experimental tools, and strategize
          alternatively.
        </SubSection>
      </div>
      <SquareField
        squares={[{ color: 'grey-light', size: 16, bottom: 0, right: 0 }]}
        className="hidden md:block"
      />
      <div className="bg-grey-dark py-16">
        <h1 className="text-6xl text-white font-mono mx-auto mb-16">
          COMMUNITY BUILDING
        </h1>
        <div className="w-2/3 mx-auto">
          <div className="flex flex-col md:flex-row md:gap-x-16">
            <div className="flex-1">
              <CustomImage
                src={pixelStar.src}
                height={pixelStar.height / 3}
                width={pixelStar.width / 3}
                alt=""
              />
              <SubSection
                header="Volunteers"
                headerSize="3xl"
                contentSize="2xl"
                textColor="white"
              >
                This year we attracted volunteers that worked for Trello,
                Microsoft, Etsy, Better Eating, Mercy for Animals, Save Movement
                and Paypal!
              </SubSection>
            </div>
            <div className="flex-1">
              <CustomImage
                src={pixelHeart.src}
                height={pixelHeart.height / 3}
                width={pixelHeart.width / 3}
                alt=""
              />
              <SubSection
                header="Our Values"
                headerSize="3xl"
                contentSize="2xl"
                textColor="white"
              >
                We came together as a community and decided on what values we
                wanted to adopt, and to formalize what our mission and goals
                were.
              </SubSection>
            </div>
          </div>
          <SubSection
            header="Partnerships"
            headerSize="3xl"
            contentSize="2xl"
            textColor="white"
          >
            This year we&apos;re extremely happy to have partnered with PETA,
            Beyond Animal, and Project Counterglow. These three partners have
            elevated us this year and we&apos;re so grateful to have the ability
            to both serve them and rely on them as our new friends.
          </SubSection>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center">
            <CustomImage src={petaLogo} alt="peta logo" />
            <CustomImage src={beyondLogo} alt="beyond animal logo" />
            <CustomImage src={counterglowLogo} alt="counterglow logo" />
          </div>
        </div>
      </div>
      <SquareField squares={NEW_TEAM_SQUARES} className="hidden md:block" />
      <div className="bg-grey-background py-16">
        <h2 className="text-3xl mx-auto flex flex-col justify-center">
          <div className="w-36 mx-auto">
            <CustomImage
              className="drop-shadow-xl"
              src={Strawberry}
              alt=""
              layout="responsive"
              loading="eager"
            />
          </div>
          <div className="px-5 mb-5">
            <span className="font-bold">Data Analytics |</span> Team Strawberry
          </div>
        </h2>
        <SubSection headerSize="3xl" contentSize="2xl" spacing={4}>
          We&apos;ve{' '}
          <Link href="https://veganhacktivists.org/blog/were-assembling-a-data-and-analytics-team">
            <a className="text-magenta hover:underline active:text-magenta-light">
              started up a new team
            </a>
          </Link>{' '}
          dedicated to collecting and analyzing data not only on the projects
          that we build, but Vegan Hacktivists as an organization. This team
          marks our commitment to data, a commitment to making sure that
          everything we do makes a big impact, and that we&apos;re able to learn
          from our work in the past, as well as shaping the work we do in the
          future.
        </SubSection>
        <SubSection headerSize="3xl" contentSize="2xl" spacing={4}>
          Suan Chin is leading this team with 7 other data scientists. See the
          entire team by visiting the{' '}
          <Link href="/people/team">
            <a className="text-magenta hover:underline active:text-magenta-light">
              team page here.
            </a>
          </Link>{' '}
          We&apos;re excited to see how this team will shape the future of the
          work we do!
        </SubSection>
        <h2 className="text-3xl mx-auto flex flex-col justify-center">
          <div className="w-36 mx-auto">
            <CustomImage
              src={Blueberry}
              alt=""
              layout="responsive"
              loading="eager"
              className="drop-shadow-xl"
            />
          </div>
          <div className="px-5 mb-5">
            <span className="font-bold">Specialists |</span> Team Blueberry
          </div>
        </h2>
        <SubSection headerSize="3xl" contentSize="2xl">
          We recently introduced the Specialists team! 9 new activists have
          joined the team and each one currently fulfilling the roles of:
          Release, DevOps, Security, SEO, CSS, Art, Maps, Video, and Audio. This
          filled a gap where our team members could specifically get issues
          addressed on their projects through Team Bluebbery.
        </SubSection>
      </div>
      <SquareField
        squares={MINOR_CHANGES_SQUARES}
        className="hidden md:block"
      />
      <div className="py-16 -mt-7">
        <FirstSubSection
          header="Minor changes with a BIG IMPACT"
          firstWordsNum={4}
        />
        <div className="space-y-6 text-left mx-auto md:w-max text-2xl">
          {[
            {
              icon: <>&#127815;</>,
              description: (
                <>We integrated Google Analytics into all of our projects.</>
              ),
            },
            {
              icon: <>&#127817;</>,
              description: (
                <>We started accepting applications from Python developers.</>
              ),
            },
            {
              icon: <>&#127818;</>,
              description: (
                <>We published our anonymous volunteer feedback form.</>
              ),
            },
            {
              icon: <> &#127820;</>,
              description: (
                <>We launched our LinkedIn page for our volunteers.</>
              ),
            },
            {
              icon: <>&#127822;</>,
              description: (
                <>
                  We enabled bot notifications for community events & actions.
                </>
              ),
            },
            {
              icon: <>&#129373;</>,
              description: (
                <>We released and open-sourced several of our past projects.</>
              ),
            },
            {
              icon: <>&#129365;</>,
              description: (
                <>We improved our on-boarding process and developer guides.</>
              ),
            },
            {
              icon: <>&#127827;</>,
              description: (
                <>We installed advanced server monitoring software.</>
              ),
            },
          ].map(({ icon, description }, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-x-5 w-full justify-start"
            >
              <div className="mx-auto md:mx-0 text-5xl md:text-2xl">{icon}</div>
              <div className="mx-auto md:mx-0 text-center md:text-left">
                {description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SquareField
        squares={[{ color: 'grey-light', size: 16, right: 0, bottom: 0 }]}
      />
      <div className="bg-black py-24 uppercase">
        <div className="w-5/6 md:w-2/3 mx-auto space-y-8">
          <h1 className="text-white text-6xl font-mono">By the numbers</h1>
          <h2 className="bg-grey-dark text-4xl font-bold font-mono text-white p-6 text-left">
            OUR 2020 TRAFFIC
          </h2>
          <div className="flex flex-col md:flex-row gap-x-5">
            <div className="flex-1 text-left">
              <h1 className="text-magenta font-mono font-bold">
                <AnimatedNumber number={318000} approx />
              </h1>
              <p className="text-3xl text-white font-mono font-bold w-2/3">
                UNIQUE VISITORS
              </p>
            </div>
            <div className="flex-1 text-left">
              <h1 className="text-magenta font-mono font-bold">
                <AnimatedNumber number={1710000} approx />
              </h1>
              <p className="text-3xl text-white font-mono font-bold w-2/3">
                UNIQUE PAGE VIEWS
              </p>
            </div>
          </div>
          <h2 className="bg-grey-dark text-4xl font-bold font-mono text-white p-6 text-left">
            PROJECT STATISTICS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            <div className="flex-1 text-left">
              <h1 className="text-green font-mono font-bold">
                <AnimatedNumber number={734} approx />
              </h1>
              <p className="text-3xl text-white font-mono w-2/3 mb-10">
                COURSES DONE ON{' '}
                <span className="font-bold">VEGANBOOTCAMP.ORG</span> IN UNDER 60
                DAYS
              </p>
            </div>
            <div className="flex-1 text-left">
              <h1 className="text-green font-mono font-bold">
                <AnimatedNumber number={8854} approx />
              </h1>
              <p className="text-3xl text-white font-mono w-2/3 mb-10">
                TWEETS BY OUR{' '}
                <span className="font-bold">5 MINUTES 5 VEGANS</span> SUPPORT
                BOT
              </p>
            </div>
            <div className="flex-1 text-left">
              <h1 className="text-green font-mono font-bold">
                <AnimatedNumber number={2528} approx />
              </h1>
              <p className="text-3xl text-white font-mono w-2/3">
                ANIMAL RIGHTS GROUPS ADDED TO{' '}
                <span className="font-bold">ANIMALRIGHTSMAP.ORG</span>
              </p>
            </div>
            <div className="flex-1 text-left">
              <h1 className="text-green font-mono font-bold">
                <AnimatedNumber number={46562} approx />
              </h1>
              <p className="text-3xl text-white font-mono w-2/3">
                CLICKS DIRECTING ACTIVISTS TO ORGS{' '}
                <span className="font-bold">VEGANACTIVISM.ORG</span>
              </p>
            </div>
          </div>
          <h2 className="bg-grey-dark text-4xl font-bold font-mono text-white p-6 text-left">
            ON THE BLOG
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 md:gap-y-0">
            <div className="flex flex-col flex-1">
              <div className="flex-1 text-left">
                <h1 className="text-yellow font-mono font-bold">
                  <AnimatedNumber number={24} />
                </h1>
                <p className="text-3xl text-white font-mono w-2/3 mb-10">
                  <b>NEW POSTS</b> FROM THE CONTENT TEAM
                </p>
              </div>
              <div className="flex-1 text-left mb-8">
                <h1 className="text-yellow font-mono font-bold">
                  <AnimatedNumber number={13926} approx />
                </h1>
                <p className="text-3xl text-white font-mono w-2/3">
                  UNIQUE <b>PAGE VIEWS</b> ON THE BLOG
                </p>
              </div>
            </div>
            <div className="md:flex-1 text-left flex flex-col">
              <TopPosts topPosts={topBlogs.map((entry) => entry.fields)} />
            </div>
          </div>
        </div>
      </div>
      <SquareField squares={PROJECT_SQUARES} className="hidden md:block" />
      <HighlightedProjects />
      <SquareField
        squares={ORGANIZATIONS_SQUARES}
        className="hidden md:block"
      />
      <Organizations />
      <SquareField squares={FINAL_SQUARES} className="hidden md:block" />
      <div className="h-16" />
      <CustomImage
        src={pixelPig.src}
        height={pixelPig.height / 3}
        width={pixelPig.width / 3}
        alt="Pixel heart"
      />
      <SubSection
        header="Finishing up and moving forward!"
        headerSize="3xl"
        contentSize="2xl"
        spacing={4}
      >
        While we&apos;re happy with this years results as-well, we recognize the
        need to take a more data-based approach in what we build if we are to
        utilize our network of amazing volunteers effectively.
      </SubSection>
      <SubSection contentSize="2xl" spacing={4}>
        We also recognize that innovation often comes in uncharted territories
        where data is often lacking - so for 2021 we want to find a good balance
        of choosing projects that align with our innovation approach, while
        utilizing data to pick which ones may have the greater chance of impact
        in our movement.
      </SubSection>

      <SubSection contentSize="2xl" spacing={4}>
        We&apos;re really excited to hear your thoughts on our 2020 year in
        review, and if you like what we do, please consider supporting us by
        clicking the button below. Your donation ensures that all of our work
        and projects remain free and accessible to everyone, and we can&apos;t
        begin to thank you enough for the support!
      </SubSection>
      <div className="flex justify-center my-16 mb-36">
        <DarkButton href="/support">Support our work!</DarkButton>
      </div>
      <Sprite image={cow} />
    </>
  );
};

export default YearInReview;
