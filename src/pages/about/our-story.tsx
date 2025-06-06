import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import { FirstSubSection } from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';

import { DarkButton } from 'components/decoration/buttons';

import type PageWithLayout from '../../types/persistentLayout';

const OurStory: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.about.section.our-story.next-seo.title',
          defaultMessage: 'Our Story',
        })}
      />
      <FirstSubSection>
        <h1 className='text-5xl md:text-6xl mb-5'>
          <span className='text-4xl font-serif italic mx-1 font-bold'>Our</span>{' '}
          <span className='text-5xl md:text-6xl font-mono font-semibold uppercase mx-1'>
            Story
          </span>
        </h1>
        <p className='pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.1'
            defaultMessage='In just over five years, Vegan Hacktivists (VH) has grown into a leading capacity-building organization, providing free, high-quality tech and creative services for the animal advocacy movement.'
          />
        </p>
        <p className='font-bold pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.2'
            defaultMessage='As the movement’s needs evolve, so does VH’s work – which is why you may know us for many different projects.'
          />
        </p>
        <p className='pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.3'
            defaultMessage='We began by building innovative tools to support vegans in their outreach, and have since grown into a team that develops expert services for the movement. While building technology remains a core part of our work, our focus has shifted toward solutions that address the movement’s most pressing needs.'
          />
        </p>
        <div>
          <h4 className='text-2xl font-bold pb-4'>
            <FormattedMessage
              id='page.about.section.our-story.paragraph.4.heading'
              defaultMessage="Today, we're especially proud of the flagship programs we've designed and continue to manage."
            />
          </h4>

          <p className='pb-8'>
            These programs address different critical needs:{' '}
            <b>Violet Studios</b>, our sister organization, provides authentic
            design and branding services at no cost, while our platforms{' '}
            <b>Granti</b>
            and <b>Playground</b> streamline grantmaking and connect advocates
            with skilled volunteers.
          </p>

          <h4 className='text-2xl font-bold pb-8'>
            <FormattedMessage
              id='page.about.section.our-story.paragraph.4.list.3'
              defaultMessage='Our growth has been driven by innovation, ability to adapt, and the dedication of our incredible volunteers.'
            />
          </h4>
        </div>
        <p className='pb-8'>
          <FormattedMessage
            id='page.about.section.our-story.paragraph.5'
            defaultMessage="Many of our team members began as volunteers and have since become part of our core teams at VH and Violet, contributing their skills in expanded and ongoing roles. We're also proud to work with over 2,600 volunteers across our internal and Playground networks. Since 2019, we’ve supported hundreds of organizations worldwide – improving their operations, elevating their brands, and helping them reach wider audiences through advanced digital tools."
          />
        </p>
        <DarkButton href='/services' className='w-fit mx-auto'>
          <FormattedMessage
            id='page.about.section.our-story.cta-services'
            defaultMessage='Learn about our services'
          />
        </DarkButton>
      </FirstSubSection>
    </>
  );
};

OurStory.Layout = AboutLayout;

export default OurStory;
