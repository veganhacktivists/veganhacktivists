import { FormattedMessage, useIntl } from 'react-intl';

import TFALogo from '../../../../../public/images/yearInReview/2023/today-for-animals-logo.png';
import TFAScreenshot from '../../../../../public/images/yearInReview/2023/today-for-animals-screenshot.jpg';

import SquareField from 'components/decoration/squares';
import { DarkButton } from 'components/decoration/buttons';
import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import Sprite, { duck } from 'components/decoration/sprite';

const TOP_DECORATION_SQUARES = [
  { color: 'grey-lighter', size: 16, right: 0, top: 0 },
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'white', size: 16, right: 0, bottom: 0 },
];

const TodayForAnimals: React.FC = () => {
  const intl = useIntl();

  const buttonLabel = intl.formatMessage({
    id: 'page.year-in-review.2023.section.tfa.label',
    defaultMessage:
      'Head to <no-localization>Today For Animals</no-localization>',
  });
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='flex flex-col md:flex-row text-left bg-white'>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-end pb-0 p-10 md:pb-10'>
          <div className='flex-grow max-w-3xl flex items-center justify-center'>
            <CustomImage
              alt='Today for Animals screenshot'
              src={TFAScreenshot}
            />
          </div>
        </div>
        <div className='basis-full md:basis-1/2 flex justify-center md:justify-start p-10'>
          <div className='flex-grow max-w-3xl flex justify-center'>
            <div className='md:py-16'>
              <div className='pb-10'>
                <CustomImage alt='Today for Animals logo' src={TFALogo} />
              </div>
              <SectionHeader
                header={intl.formatMessage({
                  id: 'page.year-in-review.2023.section.tfa.heading',
                  defaultMessage: '<b>MAKING DAILY ACTIVISM FUN</b>',
                })}
                stackEntries
              />
              <div className='text-lg pt-8 pb-4'>
                <FormattedMessage
                  id='page.year-in-review.2023.section.tfa.content'
                  defaultMessage='Towards the end of 2023, we were excited to introduce <no-localization>Today For Animals</no-localization>, a user-friendly web app that simplifies animal advocacy for everyone, from seasoned activists to newcomers. <no-localization>Today For Animals</no-localization> provides a spectrum of actions, from quick daily tasks to more challenging efforts, aimed at improving the lives of animals.{break}{break}Users can engage in "micro-activism" like leaving reviews for vegan eateries, sharing recipes, or signing petitions. Participants in the app earn recognition and climb the leaderboard as they complete tasks. They can also collect beautifully crafted badges for their profiles and maintain a daily activity streak by checking into the app each day. This gamified approach keeps our community engaged and helps everyone continuously contribute to animal advocacy.{break}{break}The launch of this project was met with great reception, and garnered 269 sign ups just within a couple of weeks. But we didn’t stop there! Our team is consistently improving the app, to keep the users curious, active, and motivated to make a difference even in the most mundane.'
                  values={{
                    b: (chunks) => <b>{chunks}</b>,
                    break: <br />,
                  }}
                />
              </div>
              <div className='flex flex-row justify-between mt-4'>
                <DarkButton
                  capitalize={false}
                  className='h-fit'
                  href='https://todayforanimals.org/'
                  newTab
                >
                  {buttonLabel}
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
        <Sprite image={duck} />
      </div>
    </>
  );
};

export default TodayForAnimals;
