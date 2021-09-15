import Head from 'next/head';
import Image from 'next/image';
import PixelCow from '../../../public/images/VH_PixelCow.png';
import {
  SubSection,
  FirstSubSection,
} from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';
import type PageWithLayout from '../../types/persistentLayout';

const OurMission: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Our Mission | Vegan Hacktivists</title>
      </Head>
      <FirstSubSection header="Our mission">
        Our mission is to build new, data-driven, disruptive, and innovative
        projects to help see an end to animal exploitation. We believe the
        animal rights movement has five fundamental areas it can improve on that
        we aim to solve through the work that we do.
      </FirstSubSection>
      <div className="m-10 pb-10">
        <div className="pb-5">
          <Image
            src={PixelCow.src}
            width={PixelCow.width / 3}
            height={PixelCow.height / 3}
            alt="Our mission"
          />
        </div>
        <div>
          <SubSection header="1. We need more data in our movement.">
            We can’t realistically track or be confident that the projects and
            organizations out there right now are as effective as they can be.
            We strongly believe this is the largest issue in growing our
            movement, and so we aim to build, utilize, and gather data through
            our projects and network – and then share that data.
          </SubSection>
          <SubSection header="2. We need more competition, too.">
            We strongly believe competition is not only healthy but vital in
            growing and improving our movements’ effectiveness. Competition puts
            healthy pressure on other organizations and projects to keep
            building, improving, and innovating – and gives them more data on
            what works, and what doesn’t work.
          </SubSection>
          <SubSection header="3. We need to be more innovative.">
            We believe the movement has a lot of room and potential to be more
            innovative in its approaches. We promote, both through our work and
            our advisory program, to think outside of the box, to make
            innovation a core consideration of every part of the building
            process.
          </SubSection>
          <SubSection header="4. And we need to start collaborating.">
            We aim to help organizations and activists connect and collaborate
            in more meaningful ways. We need to utilize our networks with the
            idea of supporting our shared goals, whether that means sharing
            data, helping allocate resources and people, or general support in
            organizational challenges.
          </SubSection>
          <SubSection header="5. Finally, we need more vegans to become active.">
            Only a tiny percentage of the world is vegan, and a fraction within
            are active. Many organizations focus on converting vegans whether
            through health, environmental, or ethical reasons. We believe we can
            also be effective by creating tools to help, inspire, and motivate
            more vegans to become activists.
          </SubSection>
        </div>
      </div>
    </>
  );
};

OurMission.getLayout = AboutLayout;

export default OurMission;
