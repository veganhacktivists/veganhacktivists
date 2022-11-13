import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

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
  const intl = useIntl();

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
          alt: intl.formatMessage({ id: 'page.index.section.stage.hero.alt' }),
        }}
        alignment="right"
        classNameMapping={{
          container: 'bg-center',
        }}
      >
        <div className="relative mx-auto text-2xl text-white md:w-1/2">
          <FormattedMessage id="page.index.section.stage.subline" />
        </div>
        <div className="relative mx-auto mt-10">
          <LightButton href="/about">
            <FormattedMessage id="page.index.section.stage.cta" />
          </LightButton>
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
          <FormattedMessage
            id="page.index.section.introduction.headline"
            values={{
              left: (chunks) => (
                <span className="font-serif text-3xl italic font-semibold">
                  {chunks}{' '}
                </span>
              ),
              right: (chunks) => (
                <span className="font-mono text-5xl font-semibold">
                  {chunks}
                </span>
              ),
            }}
          />
        </p>
        <p className="pb-5">
          <FormattedMessage
            id="page.index.section.introduction.paragraph1"
            values={{ b: (chunks) => <b>{chunks}</b> }}
          />
        </p>
        <p className="pb-5">
          <FormattedMessage
            id="page.index.section.introduction.paragraph2"
            values={{ b: (chunks) => <b>{chunks}</b> }}
          />
        </p>
        <p>
          <FormattedMessage
            id="page.index.section.introduction.paragraph3"
            values={{ b: (chunks) => <b>{chunks}</b> }}
          />
        </p>
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
            header={[
              intl.formatMessage({
                id: 'page.index.section.video.headline.leftpart',
              }),
              intl.formatMessage({
                id: 'page.index.section.video.headline.rightpart',
              }),
            ]}
          />
          <div className="py-2">
            <YoutubeVideo id="jaW8n1pd97U" />
          </div>
          <div>
            <FormattedMessage id="page.index.section.video.subline" />
          </div>
          <div className="mx-auto w-fit">
            <LightButton
              className=""
              href="https://www.youtube.com/c/VeganHacktivists"
            >
              <FormattedMessage id="page.index.section.video.cta" />
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
            <FormattedMessage
              id="page.index.section.projects.headline"
              values={{
                left: (chunks) => (
                  <span className="font-serif text-3xl italic font-semibold">
                    {chunks}{' '}
                  </span>
                ),
                right: (chunks) => (
                  <b className="font-mono text-5xl">{chunks}</b>
                ),
              }}
            />
          </p>
          <p>
            <FormattedMessage
              id="page.index.section.projects.paragraph"
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </p>
          <div className="grid grid-cols-1 gap-4 pt-16 lg:grid-cols-4 lg:gap-4 md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-4">
            {featuredProjects.map((project) => (
              <FeaturedProject key={project.sys.id} {...project.fields} />
            ))}
          </div>
          <div className="relative pb-16 mx-auto mt-10 md:w-1/3">
            <DarkButton href="/projects" className="font-mono">
              <FormattedMessage id="page.index.section.projects.cta" />
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
