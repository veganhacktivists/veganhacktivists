import { IntlProvider } from 'react-intl';

import { messages } from './messages';
import { useLocale } from './useLocale';

import type { PropsWithChildren } from 'react';

export const LocalisationProvider = ({ children }: PropsWithChildren) => {
  const locale = useLocale();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};
