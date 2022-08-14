import { useRouter } from 'next/router';
import { usePagination } from 'react-use-pagination';

import useOnce from './useOnce';

interface ExtendedPaginationProps {
  totalItems?: number;
  initialPageSize?: number;
  initialPage?: number;
}

export const useExtendedPagination = (props: ExtendedPaginationProps) => {
  const router = useRouter();
  const { page } = router.query;
  const pagination = usePagination({
    totalItems: props.totalItems,
    initialPageSize: props.initialPageSize,
    initialPage: props.initialPage,
  });
  useOnce(
    () => {
      if (page !== undefined) {
        let newPage = Number(page);
        newPage -= 1;
        newPage = newPage >= 0 ? newPage : 0;
        if (newPage !== pagination.currentPage) {
          pagination.setPage(newPage);
        }
      }
    },
    { enabled: router.isReady }
  );
  const increasePageNumber = () => {
    if (pagination.currentPage + 1 === pagination.totalPages) {
      return;
    }
    const newPageQuery: number = pagination.currentPage + 2;
    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: newPageQuery.toString(),
        },
      },
      undefined,
      { shallow: true }
    );
  };
  const decreasePageNumber = () => {
    if (pagination.currentPage === 0) {
      return;
    }
    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: pagination.currentPage.toString(),
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return {
    increasePageParam: increasePageNumber,
    decreasePageParam: decreasePageNumber,
    ...pagination,
  };
};
