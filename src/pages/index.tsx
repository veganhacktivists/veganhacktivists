import { NextSeo } from 'next-seo';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import heroBackground from '../../public/images/VH-hero-bg.jpg';
import heroTagline from '../../public/images/VH-hero-tagline.svg';
import { DarkButton } from '../components/decoration/buttons';
import Hero from '../components/decoration/hero';
import Sprite, { cow, goat } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { SectionHeader } from '../components/decoration/textBlocks';
import { GrantsCallToAction } from '../components/layout/grants';
import FeaturedProject from '../components/layout/index/featuredProject';
import LastBlogEntries from '../components/layout/index/lastBlogEntries';
import { pixelHeart } from '../images/separators';
import { getBlogEntries, getFeaturedProjects } from '../lib/cms/helpers';

import CustomImage from 'components/decoration/customImage';
import PlaygroundSupportCta from 'components/layout/playgroundSupportCta';

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
  { color: 'grey', size: 16, left: 32, top: 0 },
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
        title={intl.formatMessage({
          id: 'page.index.next-seo.title',
          defaultMessage:
            '<no-localization>Vegan Hacktivists</no-localization>',
        })}
        titleTemplate={intl.formatMessage({
          id: 'page.index.next-seo.title-template',
          defaultMessage:
            '<no-localization>%s | Compassion, Creativity, Code!</no-localization>',
        })}
      />
      <Hero
        main
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.index.section.stage.hero.alt',
            defaultMessage:
              '<no-localization>Empowering the movement through expert tech services</no-localization>',
          }),
        }}
        alignment='right'
        classNameMapping={{
          container: 'bg-center',
          content: 'items-center',
          tagline: 'px-8 max-w-[500px] my-[-1.5rem]',
        }}
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='content-center px-5 mx-auto my-24 text-2xl md:w-1/2'>
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt='Compassion, Creativity, Code'
        />
        <div className='mb-16 text-grey-dark'>
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.index.section.introduction.headline',
              defaultMessage:
                'We are <no-localization><b>VEGAN HACKTIVISTS</b></no-localization>',
            })}
          />
        </div>
        <p className='pb-5'>
          <FormattedMessage
            id='page.index.section.introduction.paragraph.1'
            defaultMessage='We are a global group of animal advocates offering our tech and creative skills for the animal protection movement. Our team is composed of highly-skilled professional software engineers, designers, content creators, and organizational strategists.'
            values={{ b: (chunks) => <b>{chunks}</b> }}
          />
        </p>
        <p className='pb-5'>
          <FormattedMessage
            id='page.index.section.introduction.paragraph.2'
            defaultMessage='We empower advocates worldwide by providing innovative, high-quality capacity-building services – including technology, design and advisory support – all at no cost.'
            values={{ b: (chunks) => <b>{chunks}</b> }}
          />
        </p>
        <p>
          <FormattedMessage
            id='page.index.section.introduction.paragraph.3'
            defaultMessage='Since 2019, we have served hundreds of organizations worldwide that are creating change for animals. By providing tailored advisory services, we’ve helped their projects succeed while preventing costly mistakes – saving them time and money.'
            values={{ b: (chunks) => <b>{chunks}</b> }}
          />
        </p>

        <DarkButton href='/about' className='w-fit my-8 mx-auto'>
          <FormattedMessage
            id='page.index.section.introduction.cta'
            defaultMessage='Learn More About Us'
          />
        </DarkButton>
      </div>
      <Sprite image={cow} />
      <SquareField
        squares={[{ left: 0, bottom: 0, color: 'gray' }]}
        className='hidden md:block'
      />
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='bg-grey-background'>
        <div className='content-center px-5 pt-16 mx-auto text-2xl md:w-1/2'>
          <div className='pb-5 text-grey-dark'>
            <SectionHeader
              header={intl.formatMessage({
                id: 'page.index.section.projects.headline',
                defaultMessage: 'Featured <b>PROJECTS</b>',
              })}
            />
          </div>
          <p>
            <FormattedMessage
              id='page.index.section.projects.paragraph'
              defaultMessage='Every project we release is <b>100% free for everyone</b>. We believe in accessibility and transparency, and our projects reflect those values.'
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </p>
          <div
            className={classNames(
              'grid grid-cols-2 gap-4 pt-16 sm:grid-cols-2',
              featuredProjects.length % 4 === 0
                ? 'md:grid-cols-4'
                : 'md:grid-cols-3',
            )}
          >
            {featuredProjects.map((project) => (
              <FeaturedProject key={project.sys.id} {...project.fields} />
            ))}
          </div>
          <div className='relative pb-16 mx-auto mt-10 md:w-1/3'>
            <DarkButton href='/work' className='font-mono'>
              <FormattedMessage
                id='page.index.section.projects.cta'
                defaultMessage='See Our Work'
              />
            </DarkButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={JOIN_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <PlaygroundSupportCta />
      <SquareField
        squares={BLOG_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <LastBlogEntries entries={lastBlogEntries} />
      <SquareField
        squares={PROJECT_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <GrantsCallToAction />
      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default Home;
