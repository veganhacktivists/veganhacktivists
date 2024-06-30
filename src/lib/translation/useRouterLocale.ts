import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

import { defaultLocale } from '../../../translation/defaultLocale';

export const useRouterLocale = (): string => {
  const params = useParams<{ locale: string }>();

  try {
    const router = useRouter();

    return (router.query.locale as string) ?? defaultLocale;
  } catch {
    return params?.locale ?? defaultLocale;
  }
};
