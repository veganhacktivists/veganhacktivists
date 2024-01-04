import { useRouter } from 'next/router';

export const useRouterLocale = (): string => {
  const { locale, defaultLocale } = useRouter();

  return locale ?? defaultLocale ?? 'en';
};
