
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

interface UpdateQuery {
  [key: string | 'update']: UpdateQuery | any;
}


export const getKeyEntry = (key: string, value: unknown): UpdateQuery | undefined => {
  if (typeof value !== 'object' || value === null) {
    if (key === 'id') return undefined;
    return {[key]: value};
  }
  const fields = Object.entries(value) ?? [];
  if (fields.length === 0) return undefined;
  let entries = {};
  for (const field of fields) {
    const [k, v] = field;
    if (k === 'id') continue;
    entries = {...entries, ...getKeyEntry(k, v)};
  }
  return {[key]: { update: entries}}
}

export const buildUpdateQuery = (data: { [key: string]: unknown }) => {
  const keys = Object.keys(data);
  let query: UpdateQuery = {};
  for (const key of keys) {
    query = {...query, ...getKeyEntry(key, data[key])};
  }
  return query;
}

