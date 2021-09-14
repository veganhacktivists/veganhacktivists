import type { CONTENT_TYPE } from '../../types/generated/contentful';
import type { Entry } from 'contentful';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CF_SPACE_ID || '',
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN || '',
});

export const previewClient = createClient({
  space: process.env.CF_SPACE_ID || '',
  accessToken: process.env.CF_PREVIEW_ACCESS_TOKEN || '',
  host: 'preview.contentful.com',
});

export const getById: <T>(id: string) => Promise<Entry<T>> = async (id) => {
  return await client.getEntry(id);
};

const normalizeFilter: (
  filterType: string,
  filter: Record<string, unknown>
) => Record<string, unknown> = (filterType, filter) => {
  return Object.fromEntries(
    Object.entries(filter || {}).map(([value, filter]) => [
      `${value}[${filterType}]`,
      Array.isArray(filter) ? filter.join(',') : filter,
    ])
  );
};

export const getContents: <T>(options: {
  contentType: CONTENT_TYPE;
  query?: Record<string, unknown> & {
    filters?: Record<string, Record<string, unknown>> &
      Partial<{
        ne?: Record<string, unknown>;
        exists?: Record<string, unknown>;
        in?: Record<string, unknown>;
        all?: Record<string, unknown>;
      }>;
  };
  other?: Record<string, unknown>;
}) => Promise<Entry<T>[]> = async ({ contentType, query = {}, other }) => {
  const { filters, ...eqFilter } = query;

  const otherFilters = Object.fromEntries(
    Object.entries(filters || {}).flatMap(([filter, value]) =>
      Object.entries(normalizeFilter(filter, value))
    )
  );

  const fieldsQuery = Object.fromEntries(
    Object.entries({
      ...eqFilter,
      ...otherFilters,
    }).map(([field, value]) => [`fields.${field}`, value])
  );

  const response = await client.getEntries({
    content_type: contentType,
    ...fieldsQuery,
    ...other,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.items as Entry<any>[];
};

export const getAllIdsOfType: (
  pageContentType: CONTENT_TYPE
) => Promise<Entry<unknown>['sys']['id'][]> = async (pageContentType) => {
  const entries = await client.getEntries({
    content_type: pageContentType,
    select: 'sys.id',
  });

  return entries.items.map((entry) => entry.sys.id);
};

export default client;
