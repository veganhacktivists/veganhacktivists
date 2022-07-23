import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import ErrorPage from './_error';

import type { ErrorProps } from 'components/layout/errorPage';

const NotFound: React.FC = () => {
  const { asPath } = useRouter();

  const notFoundErrorProps: ErrorProps['error'] = useMemo(
    () => ({
      statusCode: StatusCodes.NOT_FOUND,
      name: ReasonPhrases.NOT_FOUND,
      message: `The page you requested (${asPath}) does not exist`,
    }),
    [asPath]
  );

  return (
    <>
      <NextSeo title="Page not found" />
      <ErrorPage error={notFoundErrorProps} resetErrorBoundary={() => null} />
    </>
  );
};

export default NotFound;
