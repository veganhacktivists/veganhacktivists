import Head from 'next/head';
import { PeopleHero, PeopleButtons } from '../../components/layout/people';
import { FirstSubSection } from '../../components/decoration/textBlocks';
import Sprite, { duck } from '../../components/decoration/sprite';
import SquareField from '../../components/decoration/squares';
import PixelHeart from '../../../public/images/VH_PixelHeart.png';
import JoinTheTeam from '../../components/layout/joinTheTeam';
import Image from 'next/image';

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

const People: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Partners | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="m-10">
        <PeopleButtons />
        <FirstSubSection header="Our partners">{null}</FirstSubSection>
        <div className="m-10 mb-40">Some People exist</div>
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

export default People;
