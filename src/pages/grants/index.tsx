import Head from 'next/head';
import SquareField from '../../components/decoration/squares';
import {
  GrantsHero,
  GrantsHeading,
  GrantsSubHeading,
  GrantsQualifications,
  GrantsPerks,
  GrantsPollinationProject,
  GrantsApplication,
} from '../../components/layout/grants/index';
import JoinTheTeam from '../../components/layout/joinTheTeam';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'magenta', size: 32, left: 16, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'yellow_orange', size: 16, right: 32, bottom: 16 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const GRANTS_HEADING_SQUARES = [
  { color: 'yellow_orange', size: 16, left: 16, top: 0 },
];

const GRANTS_SUBHEADING_SQUARES = [
  { color: 'yellow_orange', size: 16, right: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'yellow', size: 16, right: 0, top: 0 },
];

const GRANTS_QUALIFICATIONS_SQUARES = [
  { color: 'gray', size: 16, left: 0, bottom: 0 },
  { color: 'gray-light', size: 16, left: 0, top: 0 },
];

const OurMission: React.FC = () => {
  return (
    <>
      <Head>
        <title>Seed Funding Grants | Vegan Hacktivists</title>
      </Head>
      <GrantsHero />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <GrantsHeading />
      <SquareField
        squares={GRANTS_HEADING_SQUARES}
        className="hidden md:block"
      />

      <GrantsSubHeading />
      <SquareField
        squares={GRANTS_SUBHEADING_SQUARES}
        className="hidden md:block"
      />

      <GrantsQualifications />
      <SquareField
        squares={GRANTS_QUALIFICATIONS_SQUARES}
        className="hidden md:block"
      />

      <GrantsPerks />

      <GrantsPollinationProject />

      <div className="mt-24" />

      <GrantsApplication />

      <JoinTheTeam />
    </>
  );
};

export default OurMission;
