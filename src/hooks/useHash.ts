import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const hashToString: (hash: string) => string = (hash) => {
  return decodeURI(hash.substring(1));
};

interface UseHashProps {
  shallow?: boolean;
}

export const useHash: (
  props?: UseHashProps,
) => readonly [string, (newHash?: string | null) => void] = (
  { shallow } = { shallow: true },
) => {
  const [hash, setHash] = useState<string>('');
  const router = useRouter();
  const onHashChange = useCallback(() => {
    setHash(hashToString(window.location.hash));
  }, []);

  useEffect(() => {
    setHash(hashToString(window.location.hash));

    router.events.on('hashChangeComplete', onHashChange);
    return () => {
      router.events.off('hashChangeComplete', onHashChange);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [onHashChange, router.events]);

  const _setHash = useCallback(
    (newHash?: string | null) => {
      if (!newHash) {
        void router.push({ hash: '' }, undefined, { shallow, scroll: false });
      } else if (newHash !== hash) {
        void router.push({ hash: newHash }, undefined, {
          shallow,
          scroll: false,
        });
      }
    },
    [hash, shallow, router],
  );

  return [hash, _setHash] as const;
};
