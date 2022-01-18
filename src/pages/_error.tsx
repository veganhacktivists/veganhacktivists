import type { NextPageContext } from 'next';

import ErrorPage from '../components/layout/errorPage';

export async function getServerSideProps({ res, err }: NextPageContext) {
  const statusCode: number | undefined = res
    ? res.statusCode
    : err
    ? err.statusCode
    : 404;

  return {
    props: { statusCode },
  };
}

export default ErrorPage;
