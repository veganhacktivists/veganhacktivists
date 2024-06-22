'use client';

import { CookiesProvider } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { type PropsWithChildren } from 'react';

import { TRPCReactProvider } from 'trpc/react';

interface Props {
  intlProps: {
    locale: string;
    messages: Record<string, string>;
  };
}

const ClientProviders = ({
  children,
  intlProps: { locale, messages },
}: PropsWithChildren<Props>) => {
  return (
    <TRPCReactProvider>
      <CookiesProvider>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </CookiesProvider>
    </TRPCReactProvider>
  );
};

export default ClientProviders;
