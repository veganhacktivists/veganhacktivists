import { useRouter } from 'next/router';

export const useLocale = (): string => {
  const { locale, defaultLocale } = useRouter();

  return locale ?? defaultLocale ?? 'en';
};
