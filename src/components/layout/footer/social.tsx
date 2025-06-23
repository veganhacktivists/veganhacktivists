import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import {
  ExternalLinkButton,
  InstagramButton,
  YoutubeButton,
} from '../../decoration/buttons';

const Social: React.FC = () => {
  return (
    <div className='pt-10 md:pt-0 text-center md:text-left'>
      <div className='text-4xl font-semibold uppercase mb-1'>
        <code>
          <FormattedMessage
            id='layout.footer.navigation-item.social.headline'
            defaultMessage='Contact Us'
          />
        </code>
      </div>
      <div className='max-w-xs m-auto'>
        <FormattedMessage
          id='layout.footer.navigation-item.social.description'
          defaultMessage='If you have project ideas, suggestions, questions or anything else, get in touch!'
        />
      </div>
      <div className='font-bold pt-5 text-lg'>
        <Link href='/contact'>hello@veganhacktivists.org</Link>
      </div>
      <div className='flex w-fit md:w-auto mx-auto md:mx-0 gap-x-2 pt-5'>
        <InstagramButton href='https://www.instagram.com/veganhacktivists/' />
        <YoutubeButton href='https://www.youtube.com/c/VeganHacktivists' />
      </div>
      <div className='pt-10 text-center'>
        <ExternalLinkButton href='https://veganhacktivists.org/support'>
          <FormattedMessage
            id='layout.footer.navigation-item.support.label'
            defaultMessage='<top>Support our work</top> <bottom>Donate</bottom>'
            values={{
              top: (chunk) => (
                <div className='font-serif italic text-xl capitalize'>
                  {chunk}
                </div>
              ),
              bottom: (chunk) => (
                <div className='text-4xl uppercase font-mono font-semibold'>
                  {chunk}
                </div>
              ),
            }}
          />
        </ExternalLinkButton>
      </div>
    </div>
  );
};

export default Social;
