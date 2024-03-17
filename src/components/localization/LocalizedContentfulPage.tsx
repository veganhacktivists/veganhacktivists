import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { ShowLocalizedContentfulContent } from './useContentfulLocalizationContext';

import { useRouterLocale } from 'lib/translation/useRouterLocale';

import type { PropsWithChildren } from 'react';

const LocalizedContentfulPage = ({ children }: PropsWithChildren) => {
  const { defaultLocale } = useRouter();
  const currentLocale = useRouterLocale();
  const enabled = currentLocale !== defaultLocale;
  const [showLocalizedContent, setShowLocalizedContent] = useState(enabled);
  const [loadingChildren, setLoadingChildren] = useState<
    Record<string, boolean>
  >({});

  const registerChildLoadState = useCallback(
    (uniqueChildKey: string, loading: boolean) => {
      setLoadingChildren((loadingChildren) => ({
        ...loadingChildren,
        [uniqueChildKey]: loading,
      }));
    },
    [],
  );

  return (
    <ShowLocalizedContentfulContent.Provider
      value={{
        showLocalizedContent,
        setShowLocalizedContent,
        registerChildLoadState,
        loadingChildren,
      }}
    >
      {children}
    </ShowLocalizedContentfulContent.Provider>
  );
};

export default LocalizedContentfulPage;
