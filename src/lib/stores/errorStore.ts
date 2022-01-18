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
  generateErrorMessage: (context?: ErrorStoreProps) => string | undefined;
}

const useErrorStore = create<ErrorStoreProps & ErrorStoreMethods>(
  (set, get) => ({
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
    generateErrorMessage: (context) => {
      const { pageThatErrored, statusCode } = context || get();

      const defaultErrorMessage = pageThatErrored
        ? `[Please tell us what you were doing prior to the error occurring...]

...then I found a ${statusCode} error at ${pageThatErrored}.

Thanks!`
        : undefined;
      return defaultErrorMessage;
    },
  })
);

export default useErrorStore;
