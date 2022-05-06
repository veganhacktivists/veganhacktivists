import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const deleteNull: (obj: Record<string, unknown>) => Record<string, unknown> = (
  obj
) => {
  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const useQueryParams: () => readonly [
  ReturnType<typeof useRouter>['query'],
  (key: string, value: string | string[] | number | number[] | null) => void,
  boolean
] = () => {
  const { query, pathname, isReady, push } = useRouter();

  const _setQueryParams = useCallback(
    (key, value) => {
      push(
        {
          pathname,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          query: deleteNull({ ...query, [key]: value }) as any,
        },
        undefined,
        {
          shallow: false,
        }
      );
    },
    [query]
  );

  return [query, _setQueryParams, isReady] as const;
};

export default useQueryParams;
