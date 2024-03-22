import Link from 'next/link';
import { createIntl, createIntlCache } from 'react-intl';

import {
  ExternalLinkButton,
  InstagramButton,
  PatreonButton,
  YoutubeButton,
} from '../../decoration/buttons';

import type { ReactNode } from 'react';

const intlCache = createIntlCache();
const Social: React.FC = () => {
  const intl = createIntl(
    {
      locale: 'en',
    },
    intlCache,
  );
  return (
    <div className='pt-10 text-left'>
      <div className='text-4xl font-semibold uppercase mb-1'>
        <code>
          {intl.formatMessage({
            id: 'layout.footer.navigation-item.social.headline',
            defaultMessage: 'Contact Us',
          })}
        </code>
      </div>
      <div className='max-w-xs m-auto'>
        {intl.formatMessage({
          id: 'layout.footer.navigation-item.social.description',
          defaultMessage:
            'If you have project ideas, suggestions, questions or anything else, get in touch!',
        })}
      </div>
      <div className='font-bold pt-5 text-lg'>
        <Link href='/contact'>hello@veganhacktivists.org</Link>
      </div>
      <div className='flex gap-x-2 pt-5'>
        <InstagramButton href='https://www.instagram.com/veganhacktivists/' />
        <PatreonButton href='https://www.patreon.com/veganhacktivists' />
        <YoutubeButton href='https://www.youtube.com/c/VeganHacktivists' />
      </div>
      <div className='pt-10 text-center'>
        <ExternalLinkButton href='https://veganhacktivists.org/support'>
          {intl.formatMessage(
            {
              id: 'layout.footer.navigation-item.support.label',
              defaultMessage:
                '<top>Support our work</top> <bottom>Donate</bottom>',
            },
            {
              top: (chunk: ReactNode) => (
                <div className='font-serif italic text-xl capitalize'>
                  {chunk}
                </div>
              ),
              bottom: (chunk: ReactNode) => (
                <div className='text-4xl uppercase font-mono font-semibold'>
                  {chunk}
                </div>
              ),
            },
          )}
        </ExternalLinkButton>
      </div>
    </div>
  );
};

export default Social;
