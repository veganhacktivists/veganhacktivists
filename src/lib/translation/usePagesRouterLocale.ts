import { useRouter } from 'next/router';

import { defaultLocale } from '../../../translation/defaultLocale';

export const usePagesRouterLocale = (): string => {
  const router = useRouter();

  return (router.query.locale as string) ?? defaultLocale;
};
