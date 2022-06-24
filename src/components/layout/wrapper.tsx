import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import ErrorPage from '../../pages/_error';
import CookiesCTA from '../cookiesCTA';
import NewsletterPopup from './newsletterPopup';

import 'react-toastify/dist/ReactToastify.css';
import NotFound from '../../pages/404';
import _error from '../../pages/_error';

// http://web-accessibility.carnegiemuseums.org/code/skip-link/
const JumpToContent: React.FC = () => {
  return (
    <a
      role="button"
      className="text-white absolute top-0 text-center left-1/2 -translate-x-1/2 sm:left-2/3 xl:left-1/3 px-3 py-2 -translate-y-full focus:translate-y-22 md:focus:translate-y-2 z-30 transition-transform rounded-md"
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
      <div className="flex flex-col justify-between min-h-screen w-full">
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
  const errorCallback = () => {
    showNewsletter = false;
  };

  /*
   * Checking for sites, where the newsletter popup shouldn't be shown
   */
  let showNewsletter = true;
  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    showNewsletter = false;
  }
  //I expect only one Element (the error page) getting passed as children
  if (children && typeof children === 'object' && 'type' in children) {
    //Check for the error pages
    if (children.type === NotFound || children.type === _error) {
      showNewsletter = false;
    }
  }

  return (
    <ErrorBoundary
      onError={errorCallback}
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
