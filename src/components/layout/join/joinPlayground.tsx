import { FormattedMessage } from 'react-intl';

import { LightButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';

import { JOIN_PLAYGROUND_URL } from 'lib/discord/constants';

const JoinPlayground: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[{ size: 16, color: 'gray-light', right: 0, bottom: 0 }]}
        className='hidden md:block'
      />
      <div className='pt-16 pb-20 text-xl text-white bg-grey-darker px-5'>
        <div className='mx-auto md:w-1/2'>
          <h2 className='mb-8 font-mono text-6xl font-bold'>
            <FormattedMessage
              id='page.join.section.playground.headline'
              defaultMessage='Attention Developers!'
            />
          </h2>
          <div className='text-2xl'>
            <p className='mb-4'>
              <FormattedMessage
                id='page.join.section.playground.content'
                defaultMessage="Don't have the time to regularly volunteer with us? We've launched an open-source, public community called <b>VH: Playground</b>, which has an upward of 1,000 members on Discord! Pick up a project offered by organizations whenever you're available."
                values={{ b: (chunk) => <b>{chunk}</b> }}
              />
            </p>
          </div>
          <div className='relative mt-10 mx-auto md:w-64'>
            <LightButton
              newTab
              href={JOIN_PLAYGROUND_URL}
              className='mt-10 font-mono font-semibold'
            >
              <FormattedMessage
                id='page.join.section.playground.cta-button.label'
                defaultMessage='Join VH: Playground'
              />
            </LightButton>
          </div>
        </div>
      </div>
      <SquareField
        squares={[
          { size: 16, color: 'gray', left: 0, bottom: 0 },
          { size: 16, color: 'gray-light', left: 0, top: 0 },
        ]}
        className='hidden md:block'
      />
    </>
  );
};

export default JoinPlayground;
