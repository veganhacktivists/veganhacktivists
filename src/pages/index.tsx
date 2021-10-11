import Head from 'next/head';
import heroBackground from '../../public/images/VH-hero-bg.jpg';
import heroTagline from '../../public/images/VH-hero-tagline.png';
import pixelHeart from '../../public/images/VH_PixelHeart.png';
import { DarkButton, LightButton } from '../components/decoration/buttons';
import Hero from '../components/decoration/hero';
import SquareField from '../components/decoration/squares';
import { GrantsCallToAction } from '../components/layout/grants/index';
import JoinTheTeam from '../components/layout/joinTheTeam';
import Sprite, { cow, goat } from '../components/decoration/sprite';
import FeaturedProject from '../components/layout/index/featuredProject';
import type { IBlogEntry, IProject } from '../types/generated/contentful';
import type { GetStaticProps } from 'next';
import { getBlogEntries, getFeaturedProjects } from '../lib/cms/helpers';
import LastBlogEntries from '../components/layout/index/lastBlogEntries';
import CustomImage from '../components/decoration/customImage';

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
      <Head>
        <title>Vegan Hacktivists | Compassion, Creativity, Code!</title>
      </Head>
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
        <div className="relative text-white mx-auto md:w-1/2 text-2xl">
          Building for the animal rights movement since 2019.
        </div>
        <div className="relative mx-auto mt-10">
          <LightButton href="/about">Learn More</LightButton>
        </div>
      </Hero>
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="content-center mx-auto my-24 md:w-1/2 text-2xl px-5">
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Compassion, Creativity, Code"
        />
        <p className="mb-16 text-grey-dark">
          <span className="font-italic font-semibold text-3xl">We are </span>
          <span className="text-5xl font-mono font-semibold">
            VEGAN HACKTIVISTS
          </span>
        </p>
        <p className="pb-5">
          We&apos;re a diverse community of passionate vegan activists from all
          around the world, <b>volunteering our time and skills</b> towards the
          animal rights movement. We build free technology and offer free services 
          with the goal of reducing or stopping the mass amounts of suffering caused 
          by factory farming.
        </p>
        <p>
          <b>We do this for the animals</b> - we do this because coding is our
          way of doing our part for activism. If you believe in the work we do
          and want to support us, please consider a small donation via our{' '}
          <a
            className="text-pink font-semibold"
            href="https://www.patreon.com/veganhacktivists"
            target="_blank"
            rel="noreferrer"
          >
            Patreon
          </a>
          ! It means the world to us and the animals to have your support.
        </p>
        <div className="relative mx-auto mt-10 md:w-1/3">
          <DarkButton href="/about/our-mission" className="font-mono">
            Our Mission
          </DarkButton>
        </div>
      </div>
      <Sprite image={cow} />
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="bg-grey-background">
        <div className="content-center mx-auto md:w-1/2 text-2xl pt-16 px-5">
          <p className="text-grey-dark pb-5">
            <span className="font-italic font-semibold text-3xl">
              Featured{' '}
            </span>
            <b className="text-5xl font-mono">PROJECTS</b>
          </p>
          <p>
            Every project we release is <b>100% free for everyone</b>, we don’t
            do premium versions, advertisments, or sell user data what-so-ever.
          </p>
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-4 pt-16">
            {featuredProjects.map((project) => (
              <FeaturedProject key={project.sys.id} {...project.fields} />
            ))}
          </div>
          <div className="relative mx-auto mt-10 md:w-1/3 pb-16">
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
