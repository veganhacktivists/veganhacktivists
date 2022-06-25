import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import type { ErrorProps } from '../components/layout/errorPage';
import useErrorStore from '../lib/stores/errorStore';
import ErrorPage from './_error';

const NotFound: React.FC = () => {
  const handleError = useErrorHandler();

  // If we don't check if an error was already thrown it will be thrown again
  const error = useErrorStore((state) => state.error);
  const { asPath } = useRouter();

  const notFoundErrorProps: ErrorProps['error'] = useMemo(
    () => ({
      statusCode: StatusCodes.NOT_FOUND,
      name: ReasonPhrases.NOT_FOUND,
      message: `The page you requested (${asPath}) does not exist`,
    }),
    [asPath]
  );

  useEffect(() => {
    if (error) return;
    handleError(notFoundErrorProps);
  }, []);

  // I'd love to avoid rendering this, but otherwise the page will be blank if the user goes back
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return <ErrorPage resetErrorBoundary={() => {}} error={notFoundErrorProps} />;
};

export default NotFound;
