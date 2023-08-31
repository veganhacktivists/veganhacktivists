import React from 'react';

import DataImage from '../../../../public/images/yearInReview/2022/data.png';
import TechAndDataInTheMovement from '../../../../public/images/yearInReview/2022/tech-and-data-in-the-movement.jpeg';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import { DarkButton } from 'components/decoration/buttons';

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
          <SectionHeader
            header={['Read Our', 'Study on the State of Tech & Data']}
            newDesign
            rootClassName="text-left mx-auto mb-10 text-center lg:text-left"
          >
            <div className="flex flex-col lg:flex-row items-center justify-start gap-10 lg:gap-5">
              <div className="max-w-prose mr-auto space-y-10 lg:basis-1/2">
                <p className="text-xl">
                  We launched the first-of-its-kind study to understand how our
                  movement leverages technology. With guidance from Faunalytics
                  and research conducted by Animetrics, our 50-page report
                  explores challenges and opportunities across various topics
                  such as employment and workforce, websites and applications,
                  social media, data collection and analysis, and security. Our
                  recommendations are meant to provide actionable solutions for
                  stakeholders and community members on how we can become a more
                  technological, data-driven movement.
                </p>

                <DarkButton href="/research" className="w-fit mx-auto lg:mx-0">
                  Read the report
                </DarkButton>
              </div>
              <div className="w-full block lg:basis-1/2">
                <CustomImage
                  alt="State of Tech And Data In The Movement"
                  src={TechAndDataInTheMovement}
                  layout="intrinsic"
                />
              </div>
            </div>
          </SectionHeader>
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
