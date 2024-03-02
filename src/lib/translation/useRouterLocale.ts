import { useRouter } from 'next/router';

import { defaultLocale } from '../../../translation/defaultLocale';

export const useRouterLocale = (): string => {
  const { locale } = useRouter();

  return locale ?? defaultLocale;
};
