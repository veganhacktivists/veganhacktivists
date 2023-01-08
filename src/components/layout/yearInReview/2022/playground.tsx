import React from 'react';

import SectionContainer from '../sectionContainer';
import PlaygroundImage from '../../../../../public/images/yearInReview/2022/playground.png';
import PlaygroundLogo from '../../../../../public/images/playground/VH_Playground_Logo_Full.png';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';

const Playground: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[
          { top: 0, right: 0, color: 'yellow', size: 16 },
          { top: 0, left: 0, color: 'grey', size: 16 },
        ]}
      />
      <SectionContainer className="pb-0" color="grey-dark">
        <div className="flex flex-row flex-wrap-reverse">
          <div className="w-full md:w-1/2">
            <div className="flex xl:w-2/3 ml-auto md:pr-20 justify-center md:justify-left">
              <CustomImage
                alt="VeganHacktivists Playground"
                src={PlaygroundImage}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="xl:w-2/3">
              <div className="flex pb-10">
                <CustomImage alt="VH Playground Logo" src={PlaygroundLogo} />
              </div>
              <div className="text-white text-left pb-10 md:pb-5">
                <span className="block white text-6xl font-bold font-mono uppercase pb-5">
                  New & improved
                </span>
                <span className="text-xl">
                  Playground was our answer to meet the overwhelming demand of
                  tech and design support in our movement, while staying
                  sustainable as an organization with limited capacity. We
                  prioritized automating the process of connecting organizations
                  with technical, design, and other support needs from
                  volunteers.
                  <br />
                  <br />
                  Over 45 requests from organizations have been supported since
                  our launch. Over 1500 volunteers have joined the Playground
                  community, and it&apos;s growing every day!
                  <br />
                  <br />
                  These volunteers are not just developers or designers, but
                  also include data scientists, videographers, marketers,
                  security experts, researchers, and many more roles.
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Playground;
