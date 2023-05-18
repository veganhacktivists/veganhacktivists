import React from 'react';

import DataImage from '../../../../public/images/yearInReview/2022/data.png';
import Faunalytics from '../../../../public/images/yearInReview/2022/faunalytics.png';
import VHLogoWhiteBG from '../../../../public/images/VH_Logo_Type_WhiteBG_Tagline_300.png';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';

const TOP_DECORATION_SQUARES = [
  { color: '#BCBCBC', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  {
    right: 0,
    bottom: 0,
    color: 'yellow',
    size: 16,
  },
  {
    left: 0,
    bottom: 0,
    color: 'grey-lighter',
    size: 16,
  },
];

const StateOfData: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div>
        <div className="pb-20 pt-20 px-5">
          <div className="xl:w-2/3 mx-auto">
            <div className="flex justify-center pb-14">
              <CustomImage alt="" src={DataImage} />
            </div>
            <span className="text-4xl block text-green font-bold uppercase font-mono pb-2">
              Coming soon:
            </span>
            <span className="text-6xl block font-bold uppercase font-mono pb-2">
              State of data & technology
            </span>
            <span className="text-4xl block font-bold italic font-serif">
              In the movement
            </span>
            <span className="text-xl block pt-20">
              During the second half of the year, we launched the
              first-of-its-kind study on the state of data and technology in
              animal protection. With support and partnership from Faunalytics
              with the design of this study, our team of researchers are seeking
              to understand what are the challenges and opportunities among
              organizations working in various fields and industries within our
              broad movement. The forthcoming report will provide
              recommendations to stakeholders and help drive our organizational
              roadmap.
            </span>
            <div className="flex flex-row flex-wrap md:flex-no-wrap justify-center gap-10 pt-20 pb-20">
              <div className="bg-grey-background flex w-[305px] h-[305px] justify-center items-center p-5">
                <CustomImage alt="Faunalytics" src={Faunalytics} />
              </div>
              <div className="bg-grey-background flex w-[305px] h-[305px] justify-center items-center p-5">
                <CustomImage alt="Vegan Hacktivists" src={VHLogoWhiteBG} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default StateOfData;
