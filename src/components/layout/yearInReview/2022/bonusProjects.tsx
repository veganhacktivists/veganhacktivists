import React from 'react';

import SectionContainer from '../sectionContainer';
import { SectionHeader } from '../../../decoration/textBlocks';
import PitchFTA from '../../../../../public/images/yearInReview/2022/pitch-fta.png';
import WildAnimalSuffering from '../../../../../public/images/yearInReview/2022/wild-animal-suffering.png';

import SquareField from 'components/decoration/squares';
import CustomImage from 'components/decoration/customImage';
import { DarkButton } from 'components/decoration/buttons';

const BonusProjects: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[
          { right: 0, bottom: 0, color: 'grey-background', size: 16 },
          { left: 0, bottom: 0, color: 'grey-background', size: 16 },
          { right: 0, top: 0, color: 'grey-light', size: 16 },
        ]}
      />
      <SectionContainer
        color="grey-background"
        header={
          <SectionHeader newDesign={true} header={['Bonus', 'projects']} />
        }
      >
        <div className="pb-20">
          <div className="xl:w-1/2 mx-auto">
            <span className="text-xl">
              The team gathered together to build two mini projects before the
              end of the year that we thought would provide value to other
              movements and help promote our work.
            </span>
          </div>
          <div className="xl:w-2/3 mx-auto mt-10">
            <div className="flex flex-col md:flex-row gap-10 lg:gap-20 pb-20">
              <div>
                <div className="flex md:w-[420px] md:h-[420px] max-w-[420px] max-h-[420px] mx-auto md:mx-0">
                  <CustomImage src={PitchFTA} alt="PitchFTA" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <span className="text-4xl mb-2 block font-bold">
                  PitchFTA.org
                </span>
                <span className="text-xl block mb-5">
                  Pitch for the Animals is a mobile-friendly app that
                  crowdsources innovative ideas for the movement. The winning
                  app idea, determined by popular vote at the inaugural AVA
                  Summit, will be built by our team. Users participate in
                  various in-app and in-person activities — such as quizzes,
                  games, attending events, and participating in a scavenger hunt
                  to find QR codes at the conference — to earn votes.
                </span>
                <span className="text-3xl block font-bold uppercase">
                  Featured
                </span>
                <span className="text-xl block">2022 AVA Summit</span>
                <DarkButton className="mt-5 mx-auto md:mx-0">
                  PitchFTA.org
                </DarkButton>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
              <div>
                <div className="flex md:w-[420px] max-w-[420px] max-h-[420px] md:h-[420px] mx-auto md:mx-0">
                  <CustomImage
                    src={WildAnimalSuffering}
                    alt="WildAnimalSuffering"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <span className="text-4xl mb-2 block font-bold break-all">
                  WildAnimalSuffering.org
                </span>
                <span className="text-xl block mb-5">
                  This educational website presents the many issues facing wild
                  animals and how people can make a difference in an accessible,
                  visually-stunning format. From custom illustrations to
                  educational resources, this site brings value to the
                  conversation of wild animals. Special thanks to our friends at
                  Animal Ethics, Wild Animal Initiative, Rethink Priorities, for
                  lending their expertise for this project.
                </span>
                <span className="text-3xl block font-bold uppercase">
                  Featured
                </span>
                <span className="text-xl block">80,000 Hours Website</span>
                <span className="text-xl block">
                  Effective Altruism Newsletter
                </span>
                <span className="text-xl block">
                  Animal Charity Evaluators Newsletter
                </span>
                <DarkButton className="mt-5 mx-auto md:mx-0">
                  WildAnimalSuffering.org
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default BonusProjects;
