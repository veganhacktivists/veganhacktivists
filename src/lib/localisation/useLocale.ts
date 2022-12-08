import { useRouter } from 'next/router';

import type { Localisations } from '.';

export const useLocale = () => {
  const { locale } = useRouter();

  return locale as Localisations;
};
