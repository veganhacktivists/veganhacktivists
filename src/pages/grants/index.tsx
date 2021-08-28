import Head from 'next/head';
import SquareField from '../../components/decoration/squares';
import Sprite, { pig, chicks } from '../../components/decoration/sprite';
import {
  GrantsHero,
  GrantsHeading,
  GrantsQualifications,
  GrantsPerks,
  GrantsPollinationProject,
  GrantsApplication,
  GrantsCallToAction,
} from '../../components/layout/grants/index';
import JoinTheTeam from '../../components/layout/joinTheTeam';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'magenta', size: 32, left: 16, bottom: 0 },
  { color: 'orange', size: 16, left: 0, top: 0 },
  { color: 'yellow-orange', size: 16, right: 32, bottom: 16 },
  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const GRANTS_HEADING_SQUARES = [
  { color: 'yellow-orange', size: 16, left: 16, top: 0 },
];

const GRANTS_SUBHEADING_SQUARES = [
  { color: 'yellow-orange', size: 16, right: 0, bottom: 0 },
  { color: 'yellow', size: 16, left: 0, top: 0 },
  { color: 'yellow', size: 16, right: 0, top: 0 },
];

const GRANTS_QUALIFICATIONS_SQUARES = [
  { color: 'gray', size: 16, left: 0, bottom: 0 },
  { color: 'gray-light', size: 16, left: 0, top: 0 },
];

const Grants: React.FC = () => {
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

      <div className="p-12 bg-yellow pb-20">
        <p className="text-2xl max-w-screen-md font-mono text-center mx-auto">
          We&apos;re very happy to be able to offer up to{' '}
          <b>$1000 USD in seed funding grants</b> for oustanding, and effective,
          animal rights activism! Specifically we&apos;re looking for individual
          or grassroots groups whose primary purpose is to help reduce suffering
          for non-human farmed animals.
        </p>
      </div>
      <Sprite image={pig} />
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

      <div className="mb-24">
        <GrantsPollinationProject />
      </div>
      <Sprite image={chicks} />
      <GrantsApplication />

      <JoinTheTeam />
    </>
  );
};

export default Grants;
