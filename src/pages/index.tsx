import { NextSeo } from 'next-seo';

import heroBackground from '../../public/images/VH-hero-bg.jpg';
import heroTagline from '../../public/images/VH-hero-tagline.png';
import { DarkButton, LightButton } from '../components/decoration/buttons';
import Circle from '../components/decoration/circle';
import CustomImage from '../components/decoration/customImage';
import Hero from '../components/decoration/hero';
import Sprite, { cow, goat } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { SectionHeader } from '../components/decoration/textBlocks';
import YoutubeVideo from '../components/decoration/youtubeVideo';
import { GrantsCallToAction } from '../components/layout/grants';
import FeaturedProject from '../components/layout/index/featuredProject';
import LastBlogEntries from '../components/layout/index/lastBlogEntries';
import JoinTheTeam from '../components/layout/joinTheTeam';
import { pixelHeart } from '../images/separators';
import { getBlogEntries, getFeaturedProjects } from '../lib/cms/helpers';

import type { GetStaticProps } from 'next';
import type { IBlogEntry, IProject } from '../types/generated/contentful';

const HERO_DECORATION_SQUARES = [
  { color: 'green', size: 32, left: 0, bottom: 0 },
  { color: 'white', size: 16, left: 32, bottom: 0 },
  { color: 'magenta', size: 32, right: 0, bottom: 0 },
  { color: 'yellow', size: 32, left: 32, top: 0 },
  { color: 'yellow-orange', size: 16, left: 16, top: 32 },
  { color: 'red', size: 32, right: 32, top: 0 },
];

const PROJECT_DECORATION_SQUARES = [
  { color: 'gray-background', size: 16, left: 0, bottom: 0 },
  { color: 'grey', size: 16, left: 32, top: 0 },
  { color: 'gray-background', size: 16, right: 0, bottom: 0 },
  { color: 'grey', size: 16, right: 0, top: 0 },
];

const JOIN_DECORATION_SQUARES = [
  { color: 'gray', size: 32, left: 0, top: 0 },
  { color: 'gray-background', size: 16, left: 32, top: 0 },
  { color: 'gray-lighter', size: 16, left: 32, bottom: 0 },
];

const BLOG_DECORATION_SQUARES = [
  { color: 'white', size: 16, right: 0, bottom: 0 },
  { color: 'gray-lighter', size: 16, right: 0, top: 0 },
];

interface HomeProps {
  featuredProjects: IProject[];
  lastBlogEntries: IBlogEntry[];
}

export const getStaticProps: GetStaticProps = async () => {
  const [featuredProjects, lastBlogEntries] = await Promise.all([
    getFeaturedProjects(),
    getBlogEntries(3),
  ]);

  return { props: { featuredProjects, lastBlogEntries }, revalidate: 480 };
};

const Home: React.FC<HomeProps> = ({ featuredProjects, lastBlogEntries }) => {
  return (
    <>
      <NextSeo
        title="Vegan Hacktivists"
        titleTemplate="%s | Compassion, Creativity, Code!"
      />
      <Hero
        main
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: 'Compassion, Creativity, Code',
        }}
        alignment="right"
        classNameMapping={{
          container: 'bg-center',
        }}
      >
        <div className="relative mx-auto text-2xl text-white md:w-1/2">
          Building for the animal protection movement since 2019.
        </div>
        <div className="relative mx-auto mt-10">
          <LightButton href="/about">Learn More</LightButton>
        </div>
      </Hero>
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="content-center px-5 mx-auto my-24 text-2xl md:w-1/2">
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Compassion, Creativity, Code"
        />
        <p className="mb-16 text-grey-dark">
          <span className="font-serif text-3xl italic font-semibold">
            We are{' '}
          </span>
          <span className="font-mono text-5xl font-semibold">
            VEGAN HACKTIVISTS
          </span>
        </p>
        <p className="pb-5">
          We are a global community of passionate animal advocates offering our
          skills in building technology for the animal protection movement{' '}
          <b>through design, development, and data. </b>
          As capacity builders, we deliver innovative and quality services at no
          cost to advocates and organizations.
        </p>
        <p>
          Our team is composed of highly-skilled and professional software
          engineers, designers, data scientists, and content creators. By
          leveraging our diverse background and skill sets, we design and build{' '}
          <b>data-driven projects</b> that aim to be effective and experimental.
        </p>
        <p>
          Our <b>capacity-building services</b> are how we contribute to the
          movement. Leveraging our vast network of volunteers, we collaborate
          with individuals and organizations to offer web development, branding,
          and advisory services.
        </p>
        <div className="relative mx-auto mt-10 md:w-1/3">
          <DarkButton href="/about/our-mission" className="font-mono">
            Our Mission
          </DarkButton>
        </div>
      </div>
      <Sprite image={cow} />
      <SquareField
        squares={[
          { left: 0, bottom: 0, color: 'gray' },
          { right: 0, top: 0, color: 'white' },
          { right: 16, top: 16, color: 'white' },
        ]}
        className="hidden md:block"
      />
      <div className="relative w-full overflow-hidden text-2xl text-white bg-gray">
        <Circle
          xAlign="left"
          yAlign="bottom"
          color="grey-light"
          radius={25}
          opacity={0.1}
        />
        <Circle
          xAlign="right"
          yAlign="top"
          color="grey-dark"
          radius={50}
          opacity={0.6}
        />
        <div className="relative flex flex-col px-2 py-20 mx-auto md:w-1/2 gap-y-8">
          <SectionHeader
            className="mb-2"
            header={['Watch our', 'intro video']}
          />
          <div className="py-2">
            <YoutubeVideo id="jaW8n1pd97U" />
          </div>
          <div>Watch our other videos by clicking the button below!</div>
          <div className="mx-auto w-fit">
            <LightButton
              className=""
              href="https://www.youtube.com/c/VeganHacktivists"
            >
              Visit our channel
            </LightButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="bg-grey-background">
        <div className="content-center px-5 pt-16 mx-auto text-2xl md:w-1/2">
          <p className="pb-5 text-grey-dark">
            <span className="font-serif text-3xl italic font-semibold">
              Featured{' '}
            </span>
            <b className="font-mono text-5xl">PROJECTS</b>
          </p>
          <p>
            Every project we release is <b>100% free for everyone</b>, we
            don&apos;t do premium versions, advertisments, or sell user data
            what-so-ever.
          </p>
          <div className="grid grid-cols-1 gap-4 pt-16 lg:grid-cols-4 lg:gap-4 md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4">
            {featuredProjects.map((project) => (
              <FeaturedProject key={project.sys.id} {...project.fields} />
            ))}
          </div>
          <div className="relative pb-16 mx-auto mt-10 md:w-1/3">
            <DarkButton href="/projects" className="font-mono">
              See All Projects
            </DarkButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={JOIN_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <JoinTheTeam />
      <SquareField
        squares={BLOG_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <LastBlogEntries entries={lastBlogEntries} />
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <GrantsCallToAction />
      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default Home;
