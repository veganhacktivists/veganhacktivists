import { NextSeo } from 'next-seo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import PeopleLayout from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import SquareField from '../../components/decoration/squares';
import { getContents } from '../../lib/cms';
import ContentfulImage from '../../components/layout/contentfulImage';
import { DarkButton } from '../../components/decoration/buttons';
import { firstLetterUppercase } from '../../lib/helpers/strings';
import { pixelHeart } from '../../images/separators';

import CustomImage from 'components/decoration/customImage';

import type PageWithLayout from '../../types/persistentLayout';
import type {
  ITeamFields,
  ITeamMember,
} from '../../types/generated/contentful';
import type { GetStaticProps } from 'next';

const TEAM_SQUARES = [
  { color: 'grey-light', size: 16, left: 0, bottom: 0 },
  { color: 'grey-lighter', size: 16, left: 16, top: 0 },
  { color: 'grey-light', size: 16, right: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
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
    <div className="flex flex-col justify-between mx-auto mb-10 lg:flex-row">
      <div className="">
        {image && (
          <div className="w-full mx-auto sm:w-72 xl:w-96 aspect-square">
            <ContentfulImage image={image} alt="" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-around w-full px-10 py-10 bg-gray-background">
        <div className="mb-2 text-center lg:text-left">
          <span className="text-2xl font-bold">{name}</span>{' '}
          <span className="block ml-2 font-bold uppercase text-m text-grey md:inline">
            {position}
          </span>
        </div>
        <div className="mb-5 text-xl text-center lg:text-left">
          {description && documentToReactComponents(description)}
        </div>
        <DarkButton
          className="max-w-md mx-auto overflow-hidden font-mono overflow-ellipsis whitespace-nowrap xl:ml-0"
          href={website}
          capitalize={false}
        >
          {firstLetterUppercase(domain ?? name)}
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

const Partners: PageWithLayout<PartnerProps> = ({ partners }) => {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.people.section.partners.next-seo.title',
          defaultMessage: 'Our Partners',
        })}
      />
      <FirstSubSection
        header={intl.formatMessage({
          id: 'page.people.section.partners.intro.heading',
          defaultMessage: 'Our partners',
        })}
      >
        <FormattedMessage
          id="page.people.section.partners.intro.paragraph"
          defaultMessage="Here are partner organizations that we support and are supported by. Take a look to learn more about the amazing work they do!"
        />
      </FirstSubSection>
      <div className="m-10 mb-36">
        <PartnerList partners={partners} />
      </div>
      <SquareField squares={TEAM_SQUARES} className="hidden md:block" />
      <div className="px-10 pt-16 pb-10 bg-grey-light">
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt={intl.formatMessage({
            id: 'page.people.section.partners.community.image.alt-text',
            defaultMessage: 'Our community',
          })}
        />
        <FirstSubSection
          header={intl.formatMessage({
            id: 'page.people.section.partners.community.heading',
            defaultMessage: 'Our community',
          })}
        >
          <FormattedMessage
            id="page.people.section.partners.community.paragraph"
            defaultMessage="We are more than a group of volunteers; we are a community tethered by shared values and invested in a vision of a better world for animals. We believe in a community-first approach: one that is supportive, growth-oriented, and accountable to each other. If this resonates with you, scroll down to learn more."
          />
        </FirstSubSection>
      </div>
    </>
  );
};

Partners.Layout = PeopleLayout;

export default Partners;
