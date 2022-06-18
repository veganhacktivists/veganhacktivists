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
import type { DefaultSeoProps } from 'next-seo';
import { DefaultSeo } from 'next-seo';
import type { NextRouter } from 'next/router';

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

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Vegan Hacktivists',
};

const AppWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <CookiesProvider>
      <DefaultSeo {...SEO} />
      {children}
    </CookiesProvider>
  );
};

// override the per-page layout here
const getDefaultLayout: (
  page: React.ReactNode,
  options: NextRouter
) => React.ReactNode = (page, { pathname }) => {
  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return (
      <>
        <Header />
        <MainWrapper>{page}</MainWrapper>
      </>
    );
  }

  return (
    <>
      <Header />
      <MainWrapper>{page}</MainWrapper>
      <Footer />
    </>
  );
};

const MyApp: React.FC<AppPropsWithLayout> = ({
  Component,
  pageProps,
  router,
}) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID || '',
      });
    }
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppWrapper>
      <PageWrapper>
        {getDefaultLayout(getLayout(<Component {...pageProps} />), router)}
      </PageWrapper>
    </AppWrapper>
  );
};

export default MyApp;
