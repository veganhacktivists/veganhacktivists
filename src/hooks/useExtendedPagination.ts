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
  /*
   * Is needed in order to not rerender on param change
   */
  const changeHistoryParam = (key: string, value: string) => {
    const url = window.location.toString();
    const urlParts = url.split('?');
    const base = urlParts[0];
    let params: string[] = [];
    if (urlParts[1] !== undefined) {
      params = urlParts[1].split('&');
    }
    const paramList = [];
    let found = false;
    for (const param of params) {
      const keyValue = param.split('=');
      const newParam: { key: string; value: string } = {
        key: keyValue[0],
        value: keyValue[1],
      };
      if (keyValue[0] === key) {
        newParam.value = value;
        found = true;
      }
      paramList.push(newParam);
    }
    if (!found) {
      const newParam = { key: key, value: value };
      paramList.push(newParam);
    }
    let newUrl = base + '?';
    let firstParam = true;
    for (const param of paramList) {
      if (!firstParam) {
        newUrl += '&';
      }
      newUrl += param.key + '=' + param.value;
      firstParam = false;
    }
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
  const increasePageNumber = () => {
    if (pagination.currentPage + 1 === pagination.totalPages) {
      return;
    }
    const newPageQuery: number = pagination.currentPage + 2;
    changeHistoryParam('page', newPageQuery.toString());
  };

  const decreasePageNumber = () => {
    if (pagination.currentPage === 0) {
      return;
    }
    changeHistoryParam('page', pagination.currentPage.toString());
  };
  return {
    increasePageParam: increasePageNumber,
    decreasePageParam: decreasePageNumber,
    ...pagination,
  };
};
