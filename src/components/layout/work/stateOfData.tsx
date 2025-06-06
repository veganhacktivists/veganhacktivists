import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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
  const intl = useIntl();

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='mx-auto w-fit'>
        <div className='flex flex-col pb-20 pt-20 px-5 text-left lg:max-w-[1000px] lg:mx-auto'>
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.our-work.section.state-of-data.section-header.headline',
              defaultMessage: 'Read Our <b>Tech & Data Study</b>',
            })}
            stackEntries
            rootClassName='text-left mx-auto text-center lg:text-left w-full mb-0'
          >
            <div className='flex flex-col lg:flex-row items-center justify-start gap-20 mt-10 lg:mt-20'>
              <div className='max-w-prose space-y-10 lg:basis-[55%]'>
                <p className='text-xl'>
                  <FormattedMessage
                    id='page.our-work.section.state-of-data.content'
                    defaultMessage='With guidance from Faunalytics and research conducted by Animetrics, we launched the first-of-its-kind study to understand how our movement leverages technology. Our 50-page report explores challenges and opportunities across various topics including workforce and employment, digital platforms and applications, social media, data analytics, and security, providing actionable solutions for stakeholders and community members.'
                  />
                </p>

                <DarkButton
                  href='/research'
                  newTab
                  className='w-fit mx-auto lg:mx-0'
                >
                  <FormattedMessage
                    id='page.our-work.section.state-of-data.cta'
                    defaultMessage='Read the report'
                  />
                </DarkButton>
              </div>
              <div className='w-full md:w-[50%] lg:w-full lg:basis-[45%]'>
                <CustomImage
                  alt='State of Tech And Data In The Movement'
                  src={TechAndDataInTheMovement}
                />
              </div>
            </div>
          </SectionHeader>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default StateOfData;
