import CookiesCTA from '../cookiesCTA';

const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      {children}
    </div>
  );
};

export const MainWrapper: React.FC = ({ children }) => {
  return (
    <main className="text-center min-h-[40rem]">
      {children}
      <CookiesCTA />
    </main>
  );
};

export default PageWrapper;
