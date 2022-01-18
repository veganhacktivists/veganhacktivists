import create from 'zustand';

export interface ErrorStoreProps {
  pageThatErrored: string | null;
  statusCode: number | null;
}

interface ErrorStoreMethods {
  setErrorData: (
    pageThatErrored: ErrorStoreProps['pageThatErrored'],
    statusCode: ErrorStoreProps['statusCode']
  ) => void;
  clearErrorData: () => void;
}

const useErrorStore = create<ErrorStoreProps & ErrorStoreMethods>((set) => ({
  pageThatErrored: null,
  statusCode: null,

  setErrorData: (pageThatErrored, statusCode) =>
    set((state) => ({
      ...state,
      pageThatErrored,
      statusCode,
    })),

  clearErrorData: () =>
    set((state) => ({ ...state, pageThatErrored: null, statusCode: null })),
}));

export default useErrorStore;
