import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LightButton } from '../decoration/buttons';

const PlaygroundSupportCta: React.FC = () => {
  return (
    <div className='bg-black px-5'>
      <div className='content-center mx-auto md:w-1/2 text-2xl pb-12'>
        <p className='mb-12 text-grey-dark pt-16'>
          <span className='text-5xl font-mono text-white'>
            <FormattedMessage
              id='section.playground-support-cta.headline'
              defaultMessage='USE YOUR SKILLS TO HELP ANIMALS'
            />
          </span>
        </p>

        <p className='pb-5 mt-4 text-white'>
          <FormattedMessage
            id='section.playground-support-cta.content'
            defaultMessage='Are you a developer, writer, designer, or data analyst looking to leverage your skills to help animals? Explore available requests on Playground and collaborate on meaningful projects from anywhere in the world!<no-localization>{browseRequests}</no-localization>Are you a professional advocate or organization looking for skilled volunteer support? Submit a request and we’ll match you with the right talent for your project!<no-localization>{submitRequest}</no-localization>'
            values={{
              browseRequests: (
                <LightButton
                  href='/playground'
                  className='w-fit mx-auto mt-8 mb-12'
                >
                  <FormattedMessage
                    id='section.playground-support-cta.cta.browse-requests'
                    defaultMessage='Browse Requests'
                  />
                </LightButton>
              ),
              submitRequest: (
                <LightButton
                  href='/playground/submit'
                  className='w-fit mx-auto mt-8 mb-12'
                >
                  <FormattedMessage
                    id='section.playground-support-cta.cta.submit-request'
                    defaultMessage='Submit a Request'
                  />
                </LightButton>
              ),
              br: <br />,
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default PlaygroundSupportCta;
