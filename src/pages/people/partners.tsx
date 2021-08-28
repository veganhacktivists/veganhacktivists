import Head from 'next/head';
import { PeopleHero, PeopleButtons } from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import Sprite, { duck } from '../../components/decoration/sprite';
import SquareField from '../../components/decoration/squares';
import PixelHeart from '../../../public/images/VH_PixelHeart.png';
import JoinTheTeam from '../../components/layout/joinTheTeam';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import React from 'react';
import { getContents } from '../../lib/cms';
import { ITeamFields, ITeamMember } from '../../types/generated/contentful';
import ContentfulImage from '../../components/layout/contentfulImage';
import { DarkButton } from '../../components/decoration/buttons';

const TEAM_SQUARES1 = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

const TEAM_SQUARES2 = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 0, top: 0 },
  { color: 'grey-darker', size: 16, right: 0, bottom: 0 },
  { color: 'grey', size: 16, right: 16, top: 0 },
];

export const getStaticProps: GetStaticProps = async () => {
  const partners = await getContents<ITeamFields>({
    contentType: 'teamMember',
    query: {
      type: 'partner',
    },
  });
  return {
    props: { partners },
    revalidate: 120,
  };
};

const PartnerCard: React.FC<{ partner: ITeamMember }> = ({ partner }) => {
  const {
    name,
    image,
    description: descriptionContent,
    socialLinks,
  } = partner.fields;

  const website = socialLinks?.fields.website;
  const domainRegEx = /https?:\/\/(?:www\.)?(?<domain>[a-zA-Z0-9]+\.[a-z]+)\//;
  const domain = website?.match(domainRegEx)?.groups?.domain;

  // @ts-expect-error ts doesnt think value should be there
  const description = descriptionContent?.content[0].content[0].value;

  console.log(image?.fields.file.details);

  const imageSize = 600;
  return (
    <div className="flex flex-col md:flex-row justify-between mb-10">
      <div className="bg-grey flex-shrink">
        {image && (
          <ContentfulImage
            image={image}
            height={imageSize}
            width={imageSize}
            alt={name}
          />
        )}
      </div>
      <div className="bg-grey-light p-10">
        <div>
          <span className="mx-1 text-2xl font-bold">{name}</span>
          <span className="font-bold text-m uppercase text-grey">
            Partner Since 2020
          </span>
        </div>
        <div className="text-left text-lg mb-8">{description}</div>
        <DarkButton className="w-64" href={website}>
          {domain ?? name}
        </DarkButton>
      </div>
    </div>
  );
};

const PartnerList: React.FC<{ partners: ITeamMember[] }> = ({ partners }) => {
  const ps = partners.slice(1, 10);
  return (
    <div className="md:mx-auto w-3/4">
      {ps.map((p) => (
        <PartnerCard key={p.sys.id} partner={p} />
      ))}
    </div>
  );
};

const Partners: React.FC<{ partners: ITeamMember[] }> = ({ partners }) => {
  return (
    <>
      <Head>
        <title>Our Partners | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="m-10 mb-36">
        <PeopleButtons />
        <FirstSubSection header="Our partners">
          Here are our fantastic partners whom we support and are spported by.
          Take a look at them below, visit them, and support the amazing work
          they do!
        </FirstSubSection>
        <PartnerList partners={partners} />
      </div>
      <SquareField squares={TEAM_SQUARES1} className="hidden md:block" />
      <div className="bg-grey-light pb-10 pt-16 px-10">
        <Image
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
      <Sprite image={duck} />
      <SquareField squares={TEAM_SQUARES2} className="hidden md:block" />
      <JoinTheTeam />
    </>
  );
};

export default Partners;
