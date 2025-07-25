import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  FirstSubSection,
  SubSection,
} from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';

import type PageWithLayout from '../../types/persistentLayout';

const OurValues: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.about.section.our-values.next-seo.title',
          defaultMessage: 'Our Values',
        })}
      />
      <FirstSubSection>
        <h1 className="text-5xl md:text-6xl mb-5">
          <span className="text-4xl font-serif italic mx-1 font-bold">Our</span>{' '}
          <span className="text-5xl md:text-6xl font-mono font-semibold uppercase mx-1">
            Values
          </span>
        </h1>

        <div className="pb-10 m-10 mt-0">
          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-values.subsection-0.heading',
              defaultMessage: 'Commitment to Excellence',
            })}
          >
            <FormattedMessage
              id="page.about.section.our-values.subsection-0.paragraph"
              defaultMessage="We strive for the highest standards in all our services, ensuring that our partner organizations receive top-quality support to maximize their advocacy efforts."
            />
          </SubSection>

          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-values.subsection-1.heading',
              defaultMessage: 'Collaboration and Partnership',
            })}
          >
            <FormattedMessage
              id="page.about.section.our-values.subsection-1.paragraph"
              defaultMessage="We believe in the power of working together and building strong relationships with animal rights groups to achieve shared goals and create lasting impact."
            />
          </SubSection>

          <SubSection
            header={intl.formatMessage({
              id: 'page.about.section.our-values.subsection-2.heading',
              defaultMessage: 'Integrity and Transparency',
            })}
          >
            <FormattedMessage
              id="page.about.section.our-values.subsection-2.paragraph"
              defaultMessage="We uphold honesty, ethical practices, and open communication in all our interactions, fostering trust and accountability within the animal rights community."
            />
          </SubSection>
        </div>
      </FirstSubSection>
    </>
  );
};

OurValues.Layout = AboutLayout;

export default OurValues;
