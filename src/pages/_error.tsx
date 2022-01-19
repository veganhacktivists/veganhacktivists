import { StatusCodes } from 'http-status-codes';
import type { NextPageContext } from 'next';

import ErrorPage from '../components/layout/errorPage';

export const getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode =
    res?.statusCode || err?.statusCode || StatusCodes.NOT_FOUND;

  return {
    props: { statusCode },
  };
};

export default ErrorPage;
