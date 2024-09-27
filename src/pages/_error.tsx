import { StatusCodes } from 'http-status-codes';
import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';

import ErrorPage from '../components/layout/errorPage';

import type { NextPageContext } from 'next';

export const getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  const initialProps = await Error.getInitialProps(contextData);

  const { res, err } = contextData;

  const statusCode =
    res?.statusCode || err?.statusCode || StatusCodes.NOT_FOUND;

  return { ...initialProps, statusCode };
};

export default ErrorPage;
