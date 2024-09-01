'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useIntl } from 'react-intl';

import ErrorPage from 'components/layout/errorPage';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const intl = useIntl();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.error.next-seo.title',
          defaultMessage: 'Whoops!',
        })}
      />
      <ErrorPage error={error} resetErrorBoundary={reset} />
    </>
  );
};

export default Error;
