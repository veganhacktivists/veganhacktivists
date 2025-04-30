import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import ProvegIncubatorImage from '../../../../public/images/work/PV_Incubator_Logo_NEW_1.png';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [
  { color: 'yellow', size: 16, right: 0, top: 0 },
  { color: 'grey-background', size: 16, left: 0, top: 0 },
];

const ProvegIncubator: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='mx-auto w-fit'>
        <div className='flex flex-col pb-32 pt-20 px-5 text-left lg:max-w-[1000px] lg:mx-auto'>
          <div className='flex flex-col lg:flex-row items-center justify-start gap-20 mt-10 lg:mt-20'>
            <div className='max-w-prose space-y-10 lg:basis-[50%]'>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.our-work.section.proveg-incubator.section-header.headline',
                  defaultMessage: '<b>ALL EYES ON AI</b>',
                })}
                rootClassName='text-left mx-auto text-center lg:text-left w-full mb-0'
              >
                <p className='text-xl'>
                  <FormattedMessage
                    id='page.our-work.section.proveg-incubator.content'
                    defaultMessage='In 2024, we partnered with ProVeg Incubator to support the development of impactful AI solutions for the animal advocacy movement. By combining our expertise, we worked to identify and accelerate the most promising ideas using AI to transform the food system and improve the lives of animals. Together, we reviewed applications, advised participants, and continue to support select projects into 2025.'
                  />
                </p>
              </SectionHeader>
            </div>
            <div className='px-10 lg:p-0 lg:basis-[50%]'>
              <CustomImage
                alt='ACCELERATE YOUR AI IDEA FOR ANIMALS'
                src={ProvegIncubatorImage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProvegIncubator;
