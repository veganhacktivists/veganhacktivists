import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import ErrorPage from './_error';

import type { ErrorProps } from 'components/layout/errorPage';

const NotFound: React.FC = () => {
  const intl = useIntl();
  const { asPath } = useRouter();

  const notFoundErrorProps: ErrorProps['error'] = useMemo(
    () => ({
      statusCode: StatusCodes.NOT_FOUND,
      name: ReasonPhrases.NOT_FOUND,
      message: intl.formatMessage(
        {
          id: 'page.not-found.error-message',
          defaultMessage: 'The page you requested ({asPath}) does not exist',
        },
        { asPath }
      ),
    }),
    [asPath, intl]
  );

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.not-found.next-seo.title',
          defaultMessage: 'Page not found',
        })}
      />
      <ErrorPage error={notFoundErrorProps} resetErrorBoundary={() => null} />
    </>
  );
};

export default NotFound;
