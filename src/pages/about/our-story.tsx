import Head from 'next/head';
import Image from 'next/image';
import PixelPig from '../../../public/images/VH_PixelPig.png';
import Sprite, { goat } from '../../components/decoration/sprite';
import { AboutButtons, AboutHero } from '../../components/layout/about';
import {
  FirstSubSection,
  SubSection,
} from '../../components/decoration/textBlocks';

const OurMission: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Story | Vegan Hacktivists</title>
      </Head>
      <AboutHero />
      <div className="m-10 pb-10">
        <AboutButtons />
        <FirstSubSection header="Our story">
          We started in 2019 as a one-person team with the goal of building a
          simple animal rights tech project. After the launch of our first
          project, VeganActivism.org, we were overwhelmed by the response of
          people wanting to help us build more projects for the movement!
        </FirstSubSection>
        <Image
          src={PixelPig.src}
          width={PixelPig.width / 3}
          height={PixelPig.height / 3}
          alt="Our story"
        />
        <SubSection header="Since that day we’ve grown to 100+ volunteers">
          Most of which are mainly composed of developers, designers, and other
          types of content creators that work closely together in teams. As time
          went on, we quickly gathered the attention and support of several
          well-known vegan activists, organizations, and communities. We’re so
          grateful to have had the chance to support and work with so many
          amazing organizations and activists!
        </SubSection>
        <SubSection>
          We have seven development teams, one design team, one content team,
          and one specialist team, making up a total of 10 active teams in the
          Vegan Hacktivists. Each team has around 8 members, and each team has
          it’s own leadership and seperate independent work that they do. Some
          are building new projects, some are maintaining our most active
          projects, while others are building tech and supporting other
          organizations that requested our help.
        </SubSection>
        <SubSection>
          Whether it’s an idea of our own to help further the vegan cause, or if
          it’s an organization or activist that’s approached us for help, we
          work non-stop to hit our goals through our animal rights activism. We
          do this for the animals, we do this because coding is our way of
          supporting the movement.
        </SubSection>
        <SubSection header="Every project we release is 100% free to use for everyone">
          We think promoting veganism should never be behind a paywall, we do
          not do premium versions, microtransactions, sell user data, or do
          advertisements whatsoever. If you want to support us, please consider
          a small donation via our Patreon, it means the world to us to have
          your support.
        </SubSection>
        <SubSection>
          We routinely meet up at vegan events, communicate daily using
          hangouts, and play games together during our breaks and weekends.
          Volunteering behind a worthy cause is empowering, but having
          tight-knit friendships and fun activities really bring us together and
          reinvigorate our passion in working harder for the animals. If this
          sounds like a group you’d like to volunteer for, and you have the
          time, please click over here and find out how!
        </SubSection>
      </div>
      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />
    </>
  );
};

export default OurMission;
