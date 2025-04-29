import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import { FirstSubSection } from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';

import type PageWithLayout from '../../types/persistentLayout';

const OurMission: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.about.section.our-mission.next-seo.title',
          defaultMessage: 'Our Mission & Vision',
        })}
      />
      <FirstSubSection>
        <h1 className='text-5xl md:text-6xl'>
          <span className='text-4xl font-serif italic  mx-1 font-bold'>
            Our
          </span>{' '}
          <span className='text-5xl md:text-6xl font-mono font-semibold uppercase mx-1'>
            Mission
          </span>
        </h1>
        <p>
          <FormattedMessage
            id='page.about.section.our-mission.section-header.content'
            defaultMessage='We empower animal protection organizations worldwide by providing expert capacity-building services – including technology, creative, and advisory support – at no cost, enabling them to amplify their impact and drive positive change for animals around the world.'
          />
        </p>
        <h1 className='text-5xl md:text-6xl mt-10 mb-5'>
          <span className='text-4xl font-serif italic  mx-1 font-bold'>
            Our
          </span>{' '}
          <span className='text-5xl md:text-6xl font-mono font-semibold uppercase mx-1'>
            Vision
          </span>
        </h1>
        <p>
          <FormattedMessage
            id='page.about.section.our-mission.section-header.vision.content'
            defaultMessage='A world where every animal protection organization has the tools and support needed to effectively advocate for animals, fostering a global culture of compassion and respect for all living beings.'
          />
        </p>
      </FirstSubSection>
    </>
  );
};

OurMission.Layout = AboutLayout;

export default OurMission;
