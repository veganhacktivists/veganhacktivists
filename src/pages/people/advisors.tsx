import type { GetStaticProps } from 'next';
import Image from 'next/image';
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

import { PeopleButtons, PeopleHero } from 'components/layout/people';
import { FirstSubSection } from 'components/decoration/text-blocks';
// TODO: Will likely become something like IAdvisor, but using this for now since it should end up similar
import type {
  ISocialLinks,
  ITeamMember,
} from '../../types/generated/contentful';
// TODO: Will use this once CMS set up for advisors
// import { getContents } from 'lib/cms';

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Delete hardcoded advisors below and use from CMS once available
  // const advisors = await getContents<{ITeamMember}>('advisors');
  const advisors = [1, 2, 3, 4].map((id) => ({
    sys: {
      id,
    },
    fields: {
      name: `John Doe ${id}`,
      image: {
        fields: {
          file: {
            url: '//placekitten.com/300/300',
            details: {
              size: 300,
            },
          },
        },
      },
      socialLinks: {
        facebook: '#',
        twitter: '#',
        email: '#',
        youtube: '#',
        github: '#',
      },
    },
  }));

  return {
    props: { advisors },
  };
};

// TODO: Maybe this constant and the component below are useful across the app and better belong in some shared place
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
  const { name, image, socialLinks } = advisor.fields;
  // TODO: This will probably also come from the fields, but temporarily using the ITeamMember type, so just hard-coding for now
  const subtitle = 'Ethics over Habits';
  return (
    <div className="w-64">
      <div className="bg-grey w-100 h-64 flex justify-end mb-2">
        {image && (
          <Image
            src={`https:${image.fields.file.url}`}
            width={image.fields.file.details.size}
            height={image.fields.file.details.size}
            alt={name}
          />
        )}
        <div className={'absolute w-8 h-8'} />
      </div>
      <div className="text-left w-5/6 mx-auto my-0">
        <div className="font-bold">{name}</div>
        <div>{subtitle}</div>
        {socialLinks !== undefined ? (
          <div className="mt-6">
            <SocialLinks socialLinks={socialLinks} />
          </div>
        ) : null}
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
      {' '}
      <Head>
        <title>Our Advisors | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="m-10">
        <PeopleButtons />
        <FirstSubSection header="Our Advisors">
          {
            'We\'re so incredibly thankful to have a team of experienced advisors that support us with their personal feedback for our current and past projects.'
          }
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
