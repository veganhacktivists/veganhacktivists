import { createContext, useContext } from 'react';

export const ShowLocalizedContentfulContent = createContext<{
  showLocalizedContent: boolean;
  setShowLocalizedContent: (
    setValue: (currentValue: boolean) => boolean,
  ) => void;
  registerChildLoadState: (uniqueChildKey: string, loading: boolean) => void;
  loadingChildren: Readonly<Record<string, boolean>>;
}>({
  showLocalizedContent: true,
  setShowLocalizedContent: () => undefined,
  registerChildLoadState: () => undefined,
  loadingChildren: {},
});

export const useContentfulLocalizationContext = () => {
  const {
    showLocalizedContent,
    setShowLocalizedContent,
    registerChildLoadState,
    loadingChildren,
  } = useContext(ShowLocalizedContentfulContent);

  return {
    showLocalizedContent,
    setShowLocalizedContent,
    registerChildLoadState,
    loadingChildren,
  };
};
