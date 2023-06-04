import classNames from 'classnames';
import { Bitter, PT_Sans, Rajdhani } from 'next/font/google';
import './globals.css';

import Header from 'components/layout/header';
import { MainWrapper } from 'components/layout/wrapper';

import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: {
    template: '%s | Vegan Hacktivists',
    absolute: 'Vegan Hacktivists | Compassion, Creativity, Code!',
  },
  icons: {
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#161919',
};

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <html>
      <body
        className={classNames(
          'font-sans',
          sansFont.variable,
          serifFont.variable,
          monoFont.variable
        )}
      >
        <Header />
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
};

export default Layout;
