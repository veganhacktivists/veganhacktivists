import { FormattedMessage, useIntl } from 'react-intl';

import { LightButton } from '../../decoration/buttons';
import PollinationProjectLogo from '../../../../public/images/grants/PollinationProject-Logo.jpg';

import CustomImage from 'components/decoration/customImage';

const GrantsPollinationProject: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className='flex max-w-screen-lg mx-auto flex-row mt-12 flex-wrap'>
        <div className='w-screen md:max-w-md'>
          <CustomImage
            src={PollinationProjectLogo}
            alt={intl.formatMessage({
              id: 'page.grants.section.pollination-project.image.alt-text',
              defaultMessage:
                'Logo of <no-localization>The Pollination Project</no-localization>',
            })}
            sizes='100vw'
          />
        </div>
        <div className='flex-1 py-8 px-3 md:px-10 bg-gray-background text-center md:text-left text-2xl'>
          <p>
            <FormattedMessage
              id='page.grants.section.pollination-project.paragraph.0'
              defaultMessage="Our grants connection service is generously funded by <no-localization>The Pollination Project (TPP)</no-localization> and other private donors— please keep an eye out in your inbox, and don't forget to check spam!"
            />
          </p>
          <p className='mt-4'>
            <FormattedMessage
              id='page.grants.section.pollination-project.paragraph.1'
              defaultMessage='If your primary focus does not address farmed animals, you may still be eligible for a grant directly from <no-localization>TPP</no-localization>. We encourage you to apply through their website.'
            />
          </p>
          <LightButton
            className='mt-6 font-mono text-md font-semibold inline-block uppercase'
            href='https://thepollinationproject.org/pre-screen-quiz/'
          >
            <FormattedMessage
              id='page.grants.section.pollination-project.button'
              defaultMessage='<no-localization>ThePollinationProject.org</no-localization>'
            />
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default GrantsPollinationProject;
