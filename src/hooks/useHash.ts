import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const hashToString: (hash: string) => string = (hash) => {
  return decodeURI(hash.substring(1));
};

export const useHash: () => readonly [string, (newHash: string) => void] =
  () => {
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
    }, []);

    const _setHash = useCallback(
      (newHash: string) => {
        if (newHash !== hash) {
          router.replace('#' + newHash, undefined, {
            shallow: true,
            scroll: false,
          });
        }
      },
      [hash]
    );

    return [hash, _setHash] as const;
  };
