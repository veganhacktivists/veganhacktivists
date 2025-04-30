import React from 'react';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import PeopleLayout from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import { getContents } from '../../lib/cms';
import ContentfulImage from '../../components/layout/contentfulImage';
import SocialLinks from '../../components/layout/team/socialLinks';

import type PageWithLayout from '../../types/persistentLayout';
import type { ITeamMember } from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const advisors = await getContents<ITeamMember>({
    contentType: 'teamMember',
    query: {
      type: 'advisor',
    },
  });

  return {
    props: { advisors },
    revalidate: 480,
  };
};

const AdvisorCard: React.FC<{ advisor: ITeamMember }> = ({ advisor }) => {
  const { name, image, socialLinks, position } = advisor.fields;
  return (
    <div className='w-64'>
      <div className='flex justify-end mb-2 bg-grey'>
        {image && <ContentfulImage image={image} alt={name} />}
        <div className={'absolute w-8 h-8'} />
      </div>
      <div className='w-5/6 mx-auto my-0 text-left'>
        <div className='text-2xl font-bold'>{name}</div>
        <div className='font-serif italic'>{position}</div>
        {socialLinks && (
          <div className='mt-2'>
            <SocialLinks
              socialLinks={socialLinks.fields}
              className='justify-start'
            />
          </div>
        )}
      </div>
    </div>
  );
};
interface AdvisorsProps {
  advisors: ITeamMember[];
}

const Advisors: PageWithLayout<AdvisorsProps> = ({ advisors }) => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.people.section.advisors.next-seo.title',
          defaultMessage: 'Our Advisors',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.people.section.advisors.intro.heading',
          defaultMessage: 'Our <b>advisors</b>',
        })}
      >
        <FormattedMessage
          id='page.people.section.advisors.intro.paragraph'
          defaultMessage='We are incredibly thankful for our team of experienced advisors who provide guidance and direction to the organization, its strategy, and projects.'
        />
      </FirstSubSection>
      <div className='mx-auto my-10 lg:w-2/3'>
        <div className='grid justify-center md:grid-cols-3 '>
          {advisors.map((advisor) => (
            <div className='mx-auto my-5' key={advisor.sys.id}>
              <AdvisorCard advisor={advisor} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

Advisors.Layout = PeopleLayout;

export default Advisors;
