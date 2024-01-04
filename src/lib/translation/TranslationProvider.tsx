import { IntlProvider } from 'react-intl';

import { messages } from './messages';
import { useRouterLocale } from './useRouterLocale';

import type { PropsWithChildren } from 'react';

export const TranslationProvider = ({ children }: PropsWithChildren) => {
  const locale = useRouterLocale();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};
