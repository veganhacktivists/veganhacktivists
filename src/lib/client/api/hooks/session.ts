import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getSession } from 'next-auth/react';

import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import type { Session } from 'next-auth';

type MaybeSession<R extends boolean = false> = R extends true
  ? Session
  : Session | null;

export const useSessionQuery = <R extends boolean = false>({
  required,
  redirectTo = '/api/auth/signin?error=SessionExpired',
  queryConfig,
}: {
  required?: R;
  redirectTo?: string;
  queryConfig?: UseQueryOptions<MaybeSession<R>>;
} = {}): UseQueryResult<MaybeSession<R>> => {
  const router = useRouter();
  const query = useQuery<MaybeSession<R>, unknown, MaybeSession<R>>(
    ['session'],
    () => getSession() as Promise<MaybeSession<R>>,
    {
      onSettled: (data, error) => {
        queryConfig?.onSettled?.(data, error);
        if (data || !required) return;
        void router.push(redirectTo);
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...queryConfig,
    }
  );
  return query;
};
