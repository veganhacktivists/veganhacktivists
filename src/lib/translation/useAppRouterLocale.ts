'use client';

import { useParams } from 'next/navigation';

import { defaultLocale } from '../../../translation/defaultLocale';

export const useAppRouterLocale = (): string => {
  const params = useParams<{ locale: string }>();

  return params?.locale ?? defaultLocale;
};
