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
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.about.section.our-story.heading',
          defaultMessage: 'Our <b>story</b>',
        })}
      >
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
              defaultMessage='Today, we’re especially proud of the flagship programs we’ve designed and continue to manage, including:'
            />
          </h4>
          <ul className='list-inside list-disc pl-8 pb-4'>
            <li>
              <FormattedMessage
                id='page.about.section.our-story.paragraph.4.list.0'
                defaultMessage='Violet Studios, our sister organization, which offers authentic design and branding services to the movement at no cost.'
              />
            </li>
            <li>
              <FormattedMessage
                id='page.about.section.our-story.paragraph.4.list.1'
                defaultMessage='Granti, a platform that streamlines grantmaking for both funders and grantees.'
              />
            </li>
            <li>
              <FormattedMessage
                id='page.about.section.our-story.paragraph.4.list.2'
                defaultMessage='Playground, a platform that connects professional animal advocates with skilled volunteers.'
              />
            </li>
          </ul>
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
