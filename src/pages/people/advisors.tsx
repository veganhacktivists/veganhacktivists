import React from 'react';
import { NextSeo } from 'next-seo';

import SquareField from '../../components/decoration/squares';
import PeopleLayout from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import { getContents } from '../../lib/cms';
import ContentfulImage from '../../components/layout/contentfulImage';
import CustomImage from '../../components/decoration/customImage';
import SocialLinks from '../../components/layout/team/socialLinks';
import { pixelHeart } from '../../images/separators';

import type PageWithLayout from '../../types/persistentLayout';
import type { ITeamMember } from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';

const TEAM_SQUARES = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

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
    <div className="w-64">
      <div className="flex justify-end mb-2 bg-grey">
        {image && <ContentfulImage image={image} alt={name} />}
        <div className={'absolute w-8 h-8'} />
      </div>
      <div className="w-5/6 mx-auto my-0 text-left">
        <div className="text-2xl font-bold">{name}</div>
        <div className="font-serif italic">{position}</div>
        {socialLinks && (
          <div className="mt-2">
            <SocialLinks
              socialLinks={socialLinks.fields}
              className="justify-start"
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
  return (
    <>
      <NextSeo title="Our Advisors" />
      <FirstSubSection header="Our advisors">
        We&apos;re so incredibly thankful to have a team of experienced advisors
        that support us! Advisors lend thier experience by providing valuable
        personal feedback for our projects and organization.
      </FirstSubSection>
      <div className="mx-auto my-10 lg:w-2/3">
        <div className="grid justify-center md:grid-cols-3 ">
          {advisors.map((advisor) => (
            <div className="mx-auto my-5" key={advisor.sys.id}>
              <AdvisorCard advisor={advisor} />
            </div>
          ))}
        </div>
      </div>
      <SquareField squares={TEAM_SQUARES} className="hidden md:block" />
      <div className="pt-16 pb-10 bg-grey-light">
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Our community"
        />
        <FirstSubSection header="Our community">
          We’re not just volunteers, but we’re a community. We know each other
          personally, we play games together, talk about our lives, meet up in
          person at events, and share daily. A strong community is not only key
          for a volunteer organization, it’s vital to keeping us happy, healthy,
          and active for the animals. Interested in joining? Scroll down!
        </FirstSubSection>
      </div>
    </>
  );
};

Advisors.Layout = PeopleLayout;

export default Advisors;
