import create from 'zustand';

export interface ErrorStoreProps {
  pageThatErrored?: string;
  error?: Error & { statusCode?: number };
}

interface ErrorStoreMethods {
  setErrorData: (data: ErrorStoreProps) => void;
  clearErrorData: () => void;
  generateErrorMessage: (context?: ErrorStoreProps) => string | undefined;
}

const useErrorStore = create<ErrorStoreProps & ErrorStoreMethods>(
  (set, get) => ({
    pageThatErrored: undefined,

    setErrorData: ({ pageThatErrored, error }) =>
      set(() => ({
        pageThatErrored,
        error,
      })),

    clearErrorData: () =>
      set(() => ({
        pageThatErrored: undefined,
        error: undefined,
      })),
    generateErrorMessage: (context) => {
      const { pageThatErrored, error } = context || get();
      const thenHappened = error?.statusCode
        ? `I found a ${error?.statusCode} error`
        : 'a client error happened';

      const defaultErrorMessage = pageThatErrored
        ? `[Please tell us what you were doing prior to the error occurring...]

...then ${thenHappened} at ${pageThatErrored}${
            error?.name ? `: ${error.name}. ${error.message}` : ''
          }.

Thanks!`
        : undefined;
      return defaultErrorMessage;
    },
  })
);

export default useErrorStore;
