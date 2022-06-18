import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import ErrorPage from '../../pages/_error';
import CookiesCTA from '../cookiesCTA';
import NewsletterPopup from './newsletterPopup';

import 'react-toastify/dist/ReactToastify.css';
import useErrorStore from '../../lib/stores/errorStore';
import { useRouter } from 'next/router';

// http://web-accessibility.carnegiemuseums.org/code/skip-link/
const JumpToContent: React.FC = () => {
  return (
    <a
      role="button"
      className="absolute top-0 z-30 px-3 py-2 text-center text-white transition-transform -translate-x-1/2 -translate-y-full rounded-md left-1/2 sm:left-2/3 xl:left-1/3 focus:translate-y-22 md:focus:translate-y-2"
      href="#main"
    >
      Jump to content
    </a>
  );
};

const PageWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <JumpToContent />
      <div className="flex flex-col justify-between w-full min-h-screen">
        {children}
      </div>
    </>
  );
};

export const MainWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const error = useErrorStore((state) => state.error);
  const { asPath } = useRouter();

  const hideNewsletter =
    error || asPath === '/docs' || asPath.startsWith('/docs/');

  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return <ErrorPage {...props} />;
      }}
    >
      {/* TODO: for some reason multiple children give a time error on this main tag */}
      <main id="main" className="text-center min-h-[40rem]" tabIndex={-1}>
        <>
          {children}
          <CookiesCTA />
          {hideNewsletter || <NewsletterPopup />}
        </>
      </main>
      <ToastContainer position="bottom-right" />
    </ErrorBoundary>
  );
};

export default PageWrapper;
