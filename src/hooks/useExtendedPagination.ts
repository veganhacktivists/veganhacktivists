import { useRouter } from 'next/router';
import { usePagination } from 'react-use-pagination';

interface ExtendedPaginationProps {
  length?: number;
  pageSize: number;
  currentPage: number;
}

export const useExtendedPagination = (props?: ExtendedPaginationProps) => {
  const router = useRouter();
  const pagination = usePagination({
    totalItems: props?.length,
    initialPageSize: props?.pageSize,
    initialPage: props?.currentPage,
  });
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
    increase: increasePageNumber,
    decrease: decreasePageNumber,
    ...pagination,
  };
};
