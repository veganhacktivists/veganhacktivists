import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Sprite, { duck } from '../../components/decoration/sprite';
import SquareField from '../../components/decoration/squares';
import PixelHeart from '../../../public/images/VH_PixelHeart.png';
import JoinTheTeam from '../../components/layout/joinTheTeam';
import Image from 'next/image';
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
        <div className="text-2xl font-bold">{name}</div>
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
		  advisors that support us! Advisors lend thier experience by 
		  providing valuable personal feedback for our projects and organization.
        </FirstSubSection>
        <div className="flex flex-wrap justify-center ">
          {advisors.map((advisor) => (
            <div className="m-5" key={advisor.sys.id}>
              <AdvisorCard advisor={advisor} />
            </div>
          ))}
        </div>
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

export default Advisors;
