import { NextSeo } from 'next-seo';

import PixelCow from '../../../public/images/VH_PixelCow.png';
import CustomImage from '../../components/decoration/customImage';
import {
  SubSection,
  FirstSubSection,
} from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';

import type PageWithLayout from '../../types/persistentLayout';

const OurMission: PageWithLayout = () => {
  return (
    <>
      <NextSeo title="Our Mission" />
      <FirstSubSection header="Our mission">
        Our mission is to build data-driven, disruptive, and innovative projects
        to help see an end to animal exploitation. We believe the animal
        protection movement has five fundamental area for improvement, which we
        aim to solve through our work.
      </FirstSubSection>
      <div className="pb-10 m-10">
        <div className="pb-5">
          <CustomImage
            src={PixelCow.src}
            width={PixelCow.width / 3}
            height={PixelCow.height / 3}
            alt="Our mission"
          />
        </div>
        <div>
          <SubSection header="1. We need more data in our movement.">
            To determine effectiveness in projects, campaigns, and our work as a
            whole, meaningful data needs to be tracked and collected. We
            strongly believe that a data-driven movement will accelerate and
            elevate our work, which is why we prioritize identifying, gathering,
            and analyzing data, as well as making it accessible to others.
          </SubSection>
          <SubSection header="2. We need more competition, too.">
            We strongly believe competition is not only healthy but vital in
            improving our movement&apos;s effectiveness. Competition applies
            healthy pressure on organizations and projects to keep improving and
            iterating – and this gives us more information on what works.
          </SubSection>
          <SubSection header="3. We need to be more innovative.">
            We believe the movement has the potential to be more innovative in
            its approaches. We promote outside-the-box thinking and make
            innovation a core consideration of every part of our work and our
            processes.
          </SubSection>
          <SubSection header="4. And we need to start collaborating.">
            We aim to help organizations and individuals connect and collaborate
            in more meaningful ways. We need to leverage our knowledge and
            network with each other to support our shared goals, whether that
            means sharing research or data, resources, or generally supporting
            each other overcome organizational challenges.
          </SubSection>
          <SubSection header="5. Finally, we need more vegans to become active.">
            Only a tiny percentage of the world is vegan, and a fraction within
            are active. Many organizations encourage non-vegans to adopt
            veganism through health, environmental, or ethical reasons. We
            believe that we can also be effective by creating tools to help,
            inspire, and motivate more vegans to become advocates for the
            animals.
          </SubSection>
        </div>
      </div>
    </>
  );
};

OurMission.Layout = AboutLayout;

export default OurMission;
