/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import PageWrapper, { MainWrapper } from '../components/layout/wrapper';
import TagManager from 'react-gtm-module';

import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { NextPage } from 'next';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const ReactDOM = require('react-dom');
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID || '',
      });
    }
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CookiesProvider>
      <PageWrapper>
        <Header />
        <MainWrapper>{getLayout(<Component {...pageProps} />)}</MainWrapper>
        <Footer />
      </PageWrapper>
    </CookiesProvider>
  );
};

export default MyApp;
