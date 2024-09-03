import { Player } from '@lottiefiles/react-lottie-player';
import { FormattedMessage, useIntl } from 'react-intl';

import VSLogoLottieFile from '../../../../../public/lottiefiles/VS_logoAnim_Minimal.json';

import SquareField from 'components/decoration/squares';
import { LightButton } from 'components/decoration/buttons';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [
  { color: 'grey', size: 16, right: 0, top: 0 },
  { color: 'grey-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'gray-darker', size: 16, right: 0, bottom: 0 },
];

const VioletStudios: React.FC = () => {
  const intl = useIntl();

  const visitVioletStudiosButtonLabel = intl.formatMessage({
    id: 'page.our-work.section.design-work.button.label',
    defaultMessage:
      'Visit <no-localization>violetstudios.org</no-localization>',
  });

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='flex flex-col-reverse md:flex-row text-left'>
        <div className='basis-full md:basis-1/2 bg-[#454545] text-white flex justify-center md:justify-end pb-0'>
          <div className='flex-grow max-w-4xl flex justify-center p-10'>
            <div className='lg:w-[35.25rem] md:py-16'>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.year-in-review.2023.section.violet-studios.heading',
                  defaultMessage: 'The launch of <b>Violet Studios</b>',
                })}
                stackEntries
              />
              <div className='text-lg pt-8 pb-4'>
                <FormattedMessage
                  id='page.year-in-review.2023.section.violet-studios.content'
                  defaultMessage='Over time, we noticed several areas in need of capacity-building work, with design being at the forefront. Our design work expanded rapidly, taking on a life of its own—and became deserving of its own organization.{break}{break}We started working on the new program to help the movement shine brighter, aiming for the big launch on a special date—<no-localization>VH’s</no-localization> 5th anniversary. After careful preparations of everything that comes along with a launch of a new organization (its branding, strategy, website, and social media—the list goes on!), the team was all set for the launch on January 1st.{break}{break}Now, our sister organization, <no-localization>Violet Studios</no-localization>, continues to provide authentic design services for activists and organizations at no cost. Whether it’s branding, web design, or other high-impact areas, <no-localization>Violet</no-localization> is here to help advocates build trust, influence perceptions, and put their best foot forward.{break}{break}<b>Want to learn more?</b>'
                  values={{
                    b: (chunks) => <b>{chunks}</b>,
                    break: <br />,
                  }}
                />
              </div>
              <div className='flex flex-row justify-between mt-4'>
                <LightButton
                  capitalize={false}
                  className='md:max-w-72 h-fit'
                  href='https://violetstudios.org/'
                  newTab
                >
                  {visitVioletStudiosButtonLabel}
                </LightButton>
              </div>
            </div>
          </div>
        </div>

        <div className='basis-full md:basis-1/2 bg-[#171919] flex justify-center md:justify-start pt-20 pb-10 md:py-0'>
          <div className='flex-grow max-w-3xl flex items-center justify-center'>
            <Player
              autoplay
              loop
              src={VSLogoLottieFile}
              className='w-3/5 md:w-[290px]'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VioletStudios;