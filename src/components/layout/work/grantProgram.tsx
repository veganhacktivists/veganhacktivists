import React from 'react';

import Bee from '../../../../public/images/yearInReview/2022/bee.png';
import GrantApplicants from '../../../../public/images/yearInReview/2022/grant-applicants.png';
import GrantGranted from '../../../../public/images/yearInReview/2022/grant-granted.png';
import GrantFunded from '../../../../public/images/yearInReview/2022/grant-funded.png';

import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import AnimatedNumber from 'components/decoration/animatedNumber';
import { DarkButton } from 'components/decoration/buttons';

const TOP_DECORATION_SQUARES = [
  {
    right: 0,
    top: 0,
    color: 'yellow-dark',
    size: 16,
  },
];

const GrantProgram: React.FC = () => {
  return (
    <>
      <SquareField squares={TOP_DECORATION_SQUARES} />

      <div>
        <div className="flex flex-row flex-wrap bg-grey-background">
          <div className="w-full lg:w-2/5 xl:w-1/2 bg-grey-background pl-5">
            <div className="xl:w-2/3 ml-auto py-20">
              <div className="pr-5 xl:pr-20 space-y-8">
                <div className="flex">
                  <CustomImage alt="" width={73} height={76} src={Bee} />
                </div>
                <SectionHeader
                  header={['Our seed funding', 'GRANT PROGRAM']}
                  stackEntries={true}
                  newDesign={true}
                  className="text-left"
                >
                  <div className="space-y-10">
                    <p className="text-xl text-left">
                      Last year, we announced a partnership with The Pollination
                      Project to offer seed funding to individuals and
                      grassroots organizations. Here’s what we’ve accomplished
                      to date.
                    </p>
                    <DarkButton href="/grants" className="w-full lg:w-1/2">
                      Learn more
                    </DarkButton>
                  </div>
                </SectionHeader>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/5 xl:w-1/2 bg-yellow pr-5">
            <div className="flex justify-center h-full flex-col gap-10 pl-5 xl:pl-20 py-20">
              <div className="flex flex-row sm:gap-10">
                <div className="flex justify-center items-center collapse sm:visible md:collapse lg:visible w-0 sm:w-[115px] md:w-0 lg:w-[115px] h-[115px] bg-yellow-dark">
                  <CustomImage alt="grant applicants" src={GrantApplicants} />
                </div>
                <div className="flex flex-col justify-evenly font-mono text-left">
                  <span className="block text-8xl font-bold leading-[0.7]">
                    <AnimatedNumber number={149} />
                  </span>
                  <span className="text-3xl leading-[1.25rem]">Applicants</span>
                </div>
              </div>
              <div className="flex flex-row sm:gap-10">
                <div className="flex justify-center items-center collapse sm:visible md:collapse lg:visible w-0 sm:w-[115px] md:w-0 lg:w-[115px] h-[115px] bg-yellow-dark">
                  <CustomImage alt="grant granted" src={GrantGranted} />
                </div>
                <div className="flex flex-col justify-evenly font-mono text-left">
                  <span className="block text-8xl font-bold leading-[0.7]">
                    <AnimatedNumber prefix="$" number={72584} />
                  </span>
                  <span className="text-3xl leading-[1.25rem]">
                    Seed Funding granted
                  </span>
                </div>
              </div>
              <div className="flex flex-row sm:gap-10">
                <div className="flex justify-center items-center collapse sm:visible md:collapse lg:visible w-0 sm:w-[115px] md:w-0 lg:w-[115px] h-[115px] bg-yellow-dark">
                  <CustomImage alt="grant funded" src={GrantFunded} />
                </div>
                <div className="flex flex-col justify-evenly font-mono text-left">
                  <span className="block text-8xl font-bold leading-[0.7]">
                    <AnimatedNumber prefix="$" number={170000} />
                  </span>
                  <span className="text-3xl leading-[1.25rem]">
                    Funded by direct recommendation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrantProgram;
