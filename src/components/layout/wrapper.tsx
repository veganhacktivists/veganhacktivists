import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import ErrorPage from '../../pages/_error';
import CookiesCTA from '../cookiesCTA';
import NewsletterPopup from './newsletterPopup';

import 'react-toastify/dist/ReactToastify.css';

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

const PageWrapper: React.FC = ({ children }) => {
  return (
    <>
      <JumpToContent />
      <div className="flex flex-col justify-between w-full min-h-screen">
        {children}
      </div>
    </>
  );
};

interface MainWrapperProps {
  pathname: string;
}

export const MainWrapper: React.FC<
  React.PropsWithChildren<MainWrapperProps>
> = ({ children, pathname }) => {
  // TODO: probably better to check the store, showing the popup on the bug submit form is ugly
  const [hasError, setHasError] = useState(false);

  const showNewsletter =
    !hasError || pathname === '/docs' || pathname.startsWith('/docs/');

  return (
    <ErrorBoundary
      onError={() => {
        setHasError(true);
      }}
      onReset={() => setHasError(false)}
      fallbackRender={(props) => {
        return <ErrorPage {...props} />;
      }}
    >
      <main id="main" className="text-center min-h-[40rem]" tabIndex={-1}>
        {children}
        <CookiesCTA />
        {showNewsletter && <NewsletterPopup />}
      </main>
      <ToastContainer position="bottom-right" />
    </ErrorBoundary>
  );
};

export default PageWrapper;
