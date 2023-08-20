import React from 'react';
import { FormattedMessage } from 'react-intl';

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

      <div className="md:w-2/3 mx-auto w-fit">
        <div className="flex flex-col pb-20 pt-20 px-5 text-left">
          <div className="pb-9 w-fit">
            <CustomImage alt="" src={DataImage} />
          </div>
          <FormattedMessage
            id="page.our-work.section.state-of-data.headline"
            defaultMessage="<left>Coming soon:</left> <middle>State of data & technology</middle> <right>in the movement</right>"
            values={{
              left: (chunk) => (
                <div className="text-4xl text-green font-bold uppercase font-mono pb-3">
                  {chunk}
                </div>
              ),
              middle: (chunk) => (
                <div className="text-5xl md:text-6xl font-bold uppercase font-mono pb-2 lg:overflow-visible lg:whitespace-nowrap">
                  {chunk}
                </div>
              ),
              right: (chunk) => (
                <div className="text-4xl font-bold italic font-serif pb-8 md:pb-16">
                  {chunk}
                </div>
              ),
            }}
          />
          <div className="flex flex-col lg:flex-row items-center justify-start gap-5">
            <div className="max-w-prose mr-auto">
              <div className="text-xl">
                <FormattedMessage
                  id="page.our-work.section.state-of-data.content"
                  defaultMessage="During the second half of the year, we launched the first-of-its-kind study on the state of data and technology in animal protection. With support and partnership from Faunalytics with the design of this study, our team of researchers are seeking to understand what are the challenges and opportunities among organizations working in various fields and industries within our broad movement. The forthcoming report will provide recommendations to stakeholders and help drive our organizational roadmap."
                />
              </div>
            </div>
            <div className="md:flex-shrink-0 w-fit mr-auto lg:mx-auto">
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-grey-background aspect-square grid place-items-center w-full h-full max-w-[200px]">
                  <div className="w-fit m-auto">
                    <CustomImage
                      alt="Faunalytics"
                      src={Faunalytics}
                      layout="intrinsic"
                    />
                  </div>
                </div>
                <div className="bg-grey-background aspect-square grid place-items-center w-full h-full max-w-[200px]">
                  <div className="w-fit m-auto">
                    <CustomImage
                      alt="Vegan Hacktivists"
                      src={VHLogoWhiteBG}
                      layout="intrinsic"
                    />
                  </div>
                </div>
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
