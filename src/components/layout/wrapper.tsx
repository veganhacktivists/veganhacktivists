import React from 'react';
import CookiesCTA from '../cookiesCTA';
import { Toaster } from 'react-hot-toast';

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
      <Toaster toastOptions={{ position: 'bottom-right', duration: 5000 }} />
    </main>
  );
};

export default PageWrapper;
