import { useMemo } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';

const fuzzySearch: <T>(params: {
  fuse: Fuse<T>;
  data: T[];
  term: string;
}) => T[] = ({ fuse, data, term }) => {
  if (!term) return data;
  return fuse.search(term).map((result) => result.item);
};

const useFuse: <T>(params: {
  data: T[];
  options?: IFuseOptions<T>;
  term?: string;
  sort?: boolean;
}) => T[] = ({ data, options = {}, term = '', sort = false }) => {
  const fuseOptions = useMemo(
    () => ({
      // threshold: 0.2,
      ...options,
      shouldSort: sort,
    }),
    [options, sort],
  );

  const fuse = useMemo(() => new Fuse(data, fuseOptions), [data, fuseOptions]);

  const result = fuzzySearch({ data, term, fuse });

  return result;
};

export default useFuse;
