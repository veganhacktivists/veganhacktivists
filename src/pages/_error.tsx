import { StatusCodes } from 'http-status-codes';
import type { NextPageContext } from 'next';

import ErrorPage from '../components/layout/errorPage';

export async function getServerSideProps({ res, err }: NextPageContext) {
  const statusCode =
    res?.statusCode || err?.statusCode || StatusCodes.NOT_FOUND;

  return {
    props: { statusCode },
  };
}

export default ErrorPage;
