import type { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  faInternetExplorer,
  faLinkedin,
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faGithubSquare,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

import { PeopleButtons, PeopleHero } from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import type {
  ISocialLinks,
  ITeamMember,
} from '../../types/generated/contentful';
import { getContents } from '../../lib/cms';
import ContentfulImage from '../../components/layout/contentfulImage';

const SOCIAL_LINK_KEY_TO_ICON: Record<string, FontAwesomeIconProps['icon']> = {
  facebook: faFacebookSquare,
  twitter: faTwitterSquare,
  instagram: faInstagramSquare,
  github: faGithubSquare,
  website: faInternetExplorer,
  linkedIn: faLinkedin,
  // TODO: Do we have an icon for this?
  activistHub: faInstagramSquare,
  youtube: faYoutubeSquare,
  email: faEnvelopeSquare,
};

export const getStaticProps: GetStaticProps = async () => {
  const advisors = await getContents<ITeamMember>({
    contentType: 'teamMember',
    query: {
      type: 'advisor',
    },
  });

  return {
    props: { advisors },
  };
};

const SocialLinks: React.FC<{ socialLinks: ISocialLinks }> = ({
  socialLinks,
}) => {
  const hasAnySocialLinks = Object.keys(socialLinks).length > 0;
  if (!hasAnySocialLinks) {
    return null;
  }
  return (
    <div>
      {Object.entries(socialLinks).map(([key, value]) => (
        <a key={key} href={value}>
          <FontAwesomeIcon
            size="2x"
            fixedWidth
            icon={SOCIAL_LINK_KEY_TO_ICON[key]}
            color="grey"
          />
        </a>
      ))}
    </div>
  );
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
        <div className="font-bold">{name}</div>
        <div>{position}</div>
        {socialLinks !== undefined && (
          <div className="mt-6">
            <SocialLinks socialLinks={socialLinks} />
          </div>
        )}
      </div>
    </div>
  );
};
interface AdvisorsProps {
  advisors: ITeamMember[];
}

const Advisors: React.FC<AdvisorsProps> = ({ advisors }) => {
  return (
    <>
      <Head>
        <title>Our Advisors | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="m-10">
        <PeopleButtons />
        <FirstSubSection header="Our advisors">
          We&apos;re so incredibly thankful to have a team of experienced
          advisors that support us with their personal feedback for our current
          and past projects.
        </FirstSubSection>
        <div className="flex flex-wrap justify-center ">
          {advisors.map((advisor) => (
            <div className="m-5" key={advisor.sys.id}>
              <AdvisorCard advisor={advisor} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Advisors;
