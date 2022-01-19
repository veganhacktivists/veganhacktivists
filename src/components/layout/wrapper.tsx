import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../../pages/_error';
import CookiesCTA from '../cookiesCTA';

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

export const MainWrapper: React.FC = ({ children }) => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return <ErrorPage {...props} />;
      }}
    >
      <main id="main" className="text-center min-h-[40rem]" tabIndex={-1}>
        {children}
        <CookiesCTA />
      </main>
    </ErrorBoundary>
  );
};

export default PageWrapper;
