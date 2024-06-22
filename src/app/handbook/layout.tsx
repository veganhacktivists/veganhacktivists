import React from 'react';

import getServerIntl from '../intl';

import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../../styles/fonts.css';
import ClientProviders from '../_providers/clientProviders';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import type ReactAxe from '@axe-core/react';
import type { ReactDOM } from 'react';
import { defaultLocale } from '../../../translation/defaultLocale';
import Header from 'components/layout/header';
import { MainWrapper } from 'components/layout/wrapper';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ReactDOM = require('react-dom') as ReactDOM;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axe = require('@axe-core/react') as typeof ReactAxe;
  axe(React, ReactDOM, 1000).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error loading @axe-core/react', error);
  });
}

export function generateMetadata(): Metadata {
  const intl = getServerIntl(defaultLocale);

  const host = process.env.URL ?? 'https://veganhacktivists.org';

  return {
    title: {
      template: intl.formatMessage({
        id: 'app.template.next-seo.default.title-template',
        defaultMessage:
          '<no-localization>%s | Vegan Hacktivists</no-localization>',
      }),
      absolute: 'Vegan Hacktivists',
    },
    openGraph: {
      url: host,
      images: [
        {
          url: `${host}/images/VH_Logo_1024px.png`,
          alt: 'veganhacktivists.org Logo 1024',
          height: 1024,
          width: 1024,
        },
        {
          url: `${host}/images/VH_Logo_512px.png`,
          alt: 'veganhacktivists.org Logo 512',
          height: 512,
          width: 512,
        },
        {
          url: `${host}/images/VH_Logo_256px.png`,
          alt: 'veganhacktivists.org Logo 256',
          height: 256,
          width: 256,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

const RootLayout = ({ children }: PropsWithChildren) => {
  const intl = getServerIntl(defaultLocale);

  return (
    <html lang={defaultLocale}>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#161919' />
        <meta name='msapplication-TileColor' content='#161919' />
        <meta name='theme-color' content='#161919' />
      </head>
      <body>
        <ClientProviders
          intlProps={{
            locale: intl.locale,
            messages: intl.messages as Record<string, string>,
          }}
        >
          <Header />
          <MainWrapper>{children}</MainWrapper>
        </ClientProviders>
      </body>
    </html>
  );
};

export default RootLayout;
