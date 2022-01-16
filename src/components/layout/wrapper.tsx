import CookiesCTA from '../cookiesCTA';

const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      {children}
    </div>
  );
};

// http://web-accessibility.carnegiemuseums.org/code/skip-link/
const JumpToContent: React.FC = () => {
  return (
    <a
      role="button"
      className="text-white absolute top-0 text-center left-1/2 -translate-x-1/2 sm:left-2/3 xl:left-1/3 px-3 py-2 -translate-y-full md:focus:translate-y-0 focus:translate-y-24 z-30 transition-transform duration-200 rounded-md border-2"
      href="#main"
      tabIndex={10}
    >
      Jump to content
    </a>
  );
};

export const MainWrapper: React.FC = ({ children }) => {
  return (
    <>
      <JumpToContent />
      <main id="main" className="text-center min-h-[40rem]" tabIndex={-1}>
        {children}
        <CookiesCTA />
      </main>
    </>
  );
};

export default PageWrapper;
