import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import useErrorStore from '../../lib/stores/errorStore';
import ErrorPage from '../../pages/_error';
import CookiesCTA from '../cookiesCTA';

import NewsletterPopup from './newsletterPopup';
import { bitter, ptSans, rajdhani } from './fonts';

// http://web-accessibility.carnegiemuseums.org/code/skip-link/
const JumpToContent: React.FC = () => {
  return (
    <a
      role='button'
      className='absolute top-0 z-30 px-3 py-2 text-center text-white transition-transform -translate-x-1/2 -translate-y-full rounded-md left-1/2 sm:left-2/3 xl:left-1/3 focus:translate-y-22 md:focus:translate-y-2'
      href='#main'
    >
      Jump to content
    </a>
  );
};

const PageWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <JumpToContent />
      <div
        className={classNames(
          ptSans.variable,
          rajdhani.variable,
          bitter.variable,
          'flex flex-col justify-between w-full min-h-screen font-sans',
        )}
      >
        {children}
      </div>
      <ToastContainer position='bottom-right' />
    </>
  );
};

export const MainWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const error = useErrorStore((state) => state.error);
  const { asPath } = useRouter();

  const hideNewsletter =
    error || asPath === '/handbook' || asPath.startsWith('/handbook/');

  return (
    <main id='main' className='text-center min-h-[40rem]' tabIndex={-1}>
      <ErrorBoundary
        fallbackRender={(props) => {
          return <ErrorPage {...props} />;
        }}
      >
        <>
          {children}
          <CookiesCTA />
          {hideNewsletter || <NewsletterPopup />}
        </>
      </ErrorBoundary>
    </main>
  );
};

export default PageWrapper;
