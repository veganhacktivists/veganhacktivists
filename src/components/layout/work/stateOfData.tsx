import React from 'react';

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

      <div className="mx-auto w-fit">
        <div className="flex flex-col pb-20 pt-20 px-5 text-left lg:max-w-[1000px] lg:mx-auto">
          <SectionHeader
            header={['Read Our', 'Tech & Data Study']}
            newDesign
            stackEntries
            rootClassName="text-left mx-auto text-center lg:text-left w-full mb-0"
          >
            <div className="flex flex-col lg:flex-row items-center justify-start gap-20 mt-10 lg:mt-20">
              <div className="max-w-prose space-y-10 lg:basis-[55%]">
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

                <DarkButton
                  href="/research"
                  newTab
                  className="w-fit mx-auto lg:mx-0"
                >
                  Read the report
                </DarkButton>
              </div>
              <div className="w-full md:w-[50%] lg:w-full lg:basis-[45%]">
                <CustomImage
                  alt="State of Tech And Data In The Movement"
                  src={TechAndDataInTheMovement}
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
