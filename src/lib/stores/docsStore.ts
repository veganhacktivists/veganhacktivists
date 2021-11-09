import create from 'zustand';

interface DocsStoreProps {
  selectedSectionSlug: string | null;
  currentDocSlug: string | null;
  selectedCategory: string;
}

interface DocsStoreMethods {
  setCurrentDocSlug: (slug: DocsStoreProps['currentDocSlug']) => void;
  setSelectedSectionSlug: (slug: DocsStoreProps['selectedSectionSlug']) => void;
  setSelectedCategorySlug: (slug: DocsStoreProps['selectedCategory']) => void;
}

const useDocsStore = create<DocsStoreProps & DocsStoreMethods>((set) => ({
  selectedSectionSlug: null,
  currentDocSlug: null,
  selectedCategory: 'general',

  setCurrentDocSlug: (slug) => {
    set((state) => ({ ...state, currentDocSlug: slug }));
  },
  setSelectedSectionSlug: (slug) => {
    set((state) => ({ ...state, selectedSectionSlug: slug }));
  },
  setSelectedCategorySlug: (slug) => {
    set((state) => ({ ...state, selectedCategory: slug }));
  },
}));

export default useDocsStore;
