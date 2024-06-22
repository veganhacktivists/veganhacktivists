import 'server-only';

import { createIntl, createIntlCache } from 'react-intl';

import { messages } from 'lib/translation/messages';

const cache = createIntlCache();

export default function getServerIntl(locale: string) {
  return createIntl({ locale, messages: messages[locale] }, cache);
}
