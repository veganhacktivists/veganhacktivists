/* eslint-disable @typescript-eslint/no-var-requires */
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import PageWrapper, { MainWrapper } from 'components/layout/wrapper';

import React from 'react';
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const ReactDOM = require('react-dom');
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <PageWrapper>
        <Header />

        <MainWrapper>
          <Component {...pageProps} />
        </MainWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default MyApp;
