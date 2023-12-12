
interface SortingQuery {
  [key: string]: 'asc' | 'desc' | SortingQuery;
}

export const buildSortingQuery = (sort: string, order: 'asc' | 'desc'): SortingQuery  => {
  const columns = sort.split('.');
  if (columns.length === 1) {
    return {
      [sort]: order,
    };
  }
  return {[columns[0]]: buildSortingQuery(columns.slice(1).join('.'), order)};
};
