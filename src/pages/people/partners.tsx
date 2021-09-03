import Head from 'next/head';
import { PeopleHero, PeopleButtons } from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import Sprite, { duck } from '../../components/decoration/sprite';
import SquareField from '../../components/decoration/squares';
import PixelHeart from '../../../public/images/VH_PixelHeart.png';
import JoinTheTeam from '../../components/layout/joinTheTeam';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import React from 'react';
import { getContents } from '../../lib/cms';
import type {
  ITeamFields,
  ITeamMember,
} from '../../types/generated/contentful';
import ContentfulImage from '../../components/layout/contentfulImage';
import { DarkButton } from '../../components/decoration/buttons';
import ImageContainer from '../../components/decoration/imageContainer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
    revalidate: 480,
  };
};

const PartnerCard: React.FC<{ partner: ITeamMember }> = ({ partner }) => {
  const { name, image, description, socialLinks, position } = partner.fields;

  const website = socialLinks?.fields.website;
  const domainRegEx = /https?:\/\/(?:www\.)?(?<domain>[a-zA-Z0-9]+\.[a-z]+)\//;
  const domain = website?.match(domainRegEx)?.groups?.domain;

  return (
    <div className="flex flex-col lg:flex-row mx-auto mb-10 justify-between">
      <div className="">
        {image && (
          <ImageContainer className="w-full sm:w-72 xl:w-96 mx-auto">
            <ContentfulImage image={image} alt="" layout="responsive" />
          </ImageContainer>
        )}
      </div>
      <div className="flex flex-col justify-around bg-gray-background px-10 py-10 w-full">
        <div className="mb-2 text-center lg:text-left">
          <span className="text-2xl font-bold">{name}</span>{' '}
          <span className="ml-2 font-bold text-m uppercase text-grey block md:inline">
            {position}
          </span>
        </div>
        <div className="text-center lg:text-left text-xl mb-5">
          {description && documentToReactComponents(description)}
        </div>
        <DarkButton
          className="max-w-md overflow-ellipsis overflow-hidden whitespace-nowrap font-mono mx-auto xl:ml-0"
          href={website}
        >
          {domain ?? name}
        </DarkButton>
      </div>
    </div>
  );
};

const PartnerList: React.FC<{ partners: ITeamMember[] }> = ({ partners }) => {
  return (
    <div className="mx-auto lg:px-32 2xl:px-60">
      {partners.map((p) => (
        <PartnerCard key={p.sys.id} partner={p} />
      ))}
    </div>
  );
};

interface PartnerProps {
  partners: ITeamMember[];
}

const Partners: React.FC<PartnerProps> = ({ partners }) => {
  return (
    <>
      <Head>
        <title>Our Partners | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <PeopleButtons />
      <FirstSubSection header="Our partners">
        Here are our fantastic partners whom we support and are supported by.
        Take a look at them below, visit them, and support the amazing work they
        do!
      </FirstSubSection>
      <div className="m-10 mb-36">
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
      <Sprite image={duck} pixelsLeft={1} pixelsRight={1} />
      <SquareField squares={TEAM_SQUARES2} className="hidden md:block" />
      <JoinTheTeam />
    </>
  );
};

export default Partners;
