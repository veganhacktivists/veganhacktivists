/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import TagManager from 'react-gtm-module';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { Bitter, PT_Sans, Rajdhani } from 'next/font/google';
import classNames from 'classnames';

import useOnce from '../hooks/useOnce';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import PageWrapper, { MainWrapper } from 'components/layout/wrapper';
import { trpc } from 'lib/client/trpc';

import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { NextPage } from 'next';
import type { DefaultSeoProps } from 'next-seo';
import type ReactAxe from '@axe-core/react';
import type { ReactDOM } from 'react';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const ReactDOM = require('react-dom') as ReactDOM;
  const axe = require('@axe-core/react') as typeof ReactAxe;
  axe(React, ReactDOM, 1000).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error loading @axe-core/react', error);
  });
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const monoFont = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-mono',
});

const sansFont = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

const serifFont = Bitter({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500'],
  variable: '--font-serif',
});

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Vegan Hacktivists',
  openGraph: {
    url: 'https://veganhacktivists.org',
    images: [
      {
        url: 'https://veganhacktivists.org/images/VH_Logo_1024px.png',
        alt: 'veganhacktivists.org Logo 1024',
        height: 1024,
        width: 1024,
      },
      {
        url: 'https://veganhacktivists.org/images/VH_Logo_512px.png',
        alt: 'veganhacktivists.org Logo 512',
        height: 512,
        width: 512,
      },
      {
        url: 'https://veganhacktivists.org/images/VH_Logo_256px.png',
        alt: 'veganhacktivists.org Logo 256',
        height: 256,
        width: 256,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

const AppWrapper: React.FC<
  React.PropsWithChildren<{ session: Session | null }>
> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <DefaultSeo {...SEO} />
        {children}
      </CookiesProvider>
    </SessionProvider>
  );
};

// override the per-page layout here
const DefaultLayout: React.FC<
  React.PropsWithChildren<{
    pathname: string;
  }>
> = ({ pathname, children }) => {
  if (pathname === '/handbook' || pathname.startsWith('/handbook/')) {
    return (
      <>
        <Header />
        <MainWrapper>{children}</MainWrapper>
      </>
    );
  }

  return (
    <>
      <div
        className={classNames(
          'font-sans',
          monoFont.variable,
          sansFont.variable,
          serifFont.variable
        )}
      >
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </div>
    </>
  );
};

const MyApp: React.FC<AppPropsWithLayout> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  useOnce(() => {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID || '',
      });
    }
  });

  const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <DefaultLayout pathname={router.pathname}>
      {Component.Layout ? (
        <Component.Layout>{children}</Component.Layout>
      ) : (
        <>{children}</>
      )}
    </DefaultLayout>
  );

  return (
    <AppWrapper session={session as Session | null}>
      <PageWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageWrapper>
    </AppWrapper>
  );
};

export default trpc.withTRPC(MyApp);
