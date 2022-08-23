/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import TagManager from 'react-gtm-module';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';

import useOnce from '../hooks/useOnce';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import PageWrapper, { MainWrapper } from 'components/layout/wrapper';

import { trpc } from 'lib/client/trpc';

import type { Session } from 'next-auth';

import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { NextPage } from 'next';
import type { DefaultSeoProps } from 'next-seo';
import type ReactAxe from '@axe-core/react';
import type { ReactDOM } from 'react';
import type { AppProps } from 'next/app';

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

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Vegan Hacktivists',
  openGraph: {
    images: [82, 96, 120, 128, 144, 152, 167, 180, 192, 196, 256, 512].map(
      (size) => ({
        url: `${process.env.NEXT_PUBLIC_URL!}/images/icon-${size}x${size}.png`,
        width: size,
        height: size,
      })
    ),
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
  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return (
      <>
        <Header />
        <MainWrapper>{children}</MainWrapper>
      </>
    );
  }

  return (
    <>
      <Header />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
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
