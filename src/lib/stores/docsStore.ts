import create from 'zustand';

interface DocsStoreProps {
  selectedSectionSlug: string | null;
  currentDocSlug: string | null;
}

interface DocsStoreMethods {
  setCurrentDocSlug: (slug: DocsStoreProps['currentDocSlug']) => void;
  setSelectedSectionSlug: (slug: DocsStoreProps['selectedSectionSlug']) => void;
}

const useDocsStore = create<DocsStoreProps & DocsStoreMethods>((set) => ({
  selectedSectionSlug: null,
  currentDocSlug: null,

  setCurrentDocSlug: (slug) => {
    set((state) => ({ ...state, currentDocSlug: slug }));
  },
  setSelectedSectionSlug: (slug) => {
    set((state) => ({ ...state, selectedSectionSlug: slug }));
  },
}));

export default useDocsStore;
