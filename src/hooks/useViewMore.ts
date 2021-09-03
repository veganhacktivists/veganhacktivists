import { useCallback, useState } from 'react';

const useViewMore: (pageSize?: number) => {
  pageSize: number;
  viewMore: () => void;
  pageNumber: number;
  reset: () => void;
} = (pageSize = 12) => {
  const [pageNumber, setPageNumber] = useState(1);
  const viewMore = useCallback(() => {
    setPageNumber((curr) => curr + 1);
  }, []);

  const reset = useCallback(() => setPageNumber(1), []);

  return { pageSize, viewMore, pageNumber, reset };
};

export default useViewMore;
