import type { GetStaticProps } from 'next';
import Head from 'next/head';
import SquareField from '../../components/decoration/squares';
import PixelHeart from '../../../public/images/VH_PixelHeart.png';

import PeopleLayout from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import type { ITeamMember } from '../../types/generated/contentful';
import { getContents } from '../../lib/cms';
import ContentfulImage from '../../components/layout/contentfulImage';
import type PageWithLayout from '../../types/persistentLayout';
import CustomImage from '../../components/decoration/customImage';
import React from 'react';
import SocialLinks from '../../components/layout/team/socialLinks';

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
      <div className="bg-grey flex justify-end mb-2">
        {image && <ContentfulImage image={image} alt={name} />}
        <div className={'absolute w-8 h-8'} />
      </div>
      <div className="text-left w-5/6 mx-auto my-0">
        <div className="text-2xl font-bold">{name}</div>
        <div className="font-italic">{position}</div>
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
      <Head>
        <title>Our Advisors | Vegan Hacktivists</title>
      </Head>
      <FirstSubSection header="Our advisors">
        We&apos;re so incredibly thankful to have a team of experienced advisors
        that support us! Advisors lend thier experience by providing valuable
        personal feedback for our projects and organization.
      </FirstSubSection>
      <div className="my-10 lg:w-2/3 mx-auto">
        <div className="grid md:grid-cols-3 justify-center ">
          {advisors.map((advisor) => (
            <div className="my-5 mx-auto" key={advisor.sys.id}>
              <AdvisorCard advisor={advisor} />
            </div>
          ))}
        </div>
      </div>
      <SquareField squares={TEAM_SQUARES} className="hidden md:block" />
      <div className="bg-grey-light pb-10 pt-16">
        <CustomImage
          src={PixelHeart.src}
          width={PixelHeart.width / 3}
          height={PixelHeart.height / 3}
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

Advisors.getLayout = PeopleLayout;

export default Advisors;
