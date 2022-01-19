import create from 'zustand';

export interface ErrorStoreProps {
  pageThatErrored?: string;
  statusCode?: number;
  error?: Error;
}

interface ErrorStoreMethods {
  setErrorData: (data: ErrorStoreProps) => void;
  clearErrorData: () => void;
  generateErrorMessage: (context?: ErrorStoreProps) => string | undefined;
}

const useErrorStore = create<ErrorStoreProps & ErrorStoreMethods>(
  (set, get) => ({
    pageThatErrored: undefined,
    statusCode: undefined,

    setErrorData: ({ pageThatErrored, statusCode, error }) =>
      set(() => ({
        pageThatErrored,
        statusCode,
        error,
      })),

    clearErrorData: () =>
      set(() => ({
        pageThatErrored: undefined,
        statusCode: undefined,
        error: undefined,
      })),
    generateErrorMessage: (context) => {
      const { pageThatErrored, statusCode, error } = context || get();

      const thenHappened = error
        ? 'a client error happened'
        : `I found a ${statusCode} error`;

      const defaultErrorMessage = pageThatErrored
        ? `[Please tell us what you were doing prior to the error occurring...]

...then ${thenHappened} at ${pageThatErrored}${
            error ? `: ${error.name}. ${error.message}` : ''
          }.

Thanks!`
        : undefined;
      return defaultErrorMessage;
    },
  })
);

export default useErrorStore;
