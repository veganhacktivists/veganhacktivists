'use server';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { defaultLocale } from '../../../translation/defaultLocale';
import getServerIntl from '../intl';

import ErrorPage from 'components/layout/errorPage';

import type { Metadata } from 'next';
import type { ErrorProps } from 'components/layout/errorPage';

interface Props {
  params?: {
    locale?: string;
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const intl = getServerIntl(props.params?.locale ?? defaultLocale);

  return Promise.resolve({
    title: intl.formatMessage({
      id: 'page.not-found.next-seo.title',
      defaultMessage: 'Page not found',
    }),
  });
}

const NotFound: React.FC<Props> = (props) => {
  const intl = getServerIntl(props.params?.locale ?? defaultLocale);

  const notFoundErrorProps: ErrorProps['error'] = {
    statusCode: StatusCodes.NOT_FOUND,
    name: ReasonPhrases.NOT_FOUND,
    message: intl.formatMessage({
      id: 'page.not-found.error-message',
      defaultMessage: 'The page you requested does not exist',
    }),
  };

  return <ErrorPage error={notFoundErrorProps} />;
};

export default NotFound;
