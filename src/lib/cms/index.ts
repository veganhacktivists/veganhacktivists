import { createClient } from 'contentful';

import type { CONTENT_TYPE } from '../../types/generated/contentful';
import type { Entry } from 'contentful';

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

/**
 *
 * @param options
 * @returns The content
 */
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
  other?: Record<string, unknown> &
    Partial<{
      order: string | string[];
      /**
       * Levels of nesting
       */
      include: number;
      limit: number;
      skip: number;
      select: string | string[];
    }>;
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
  return response.items.map(removeEntriesWithoutFields) as Entry<any>[];
};

/**
  Contentful is supposed to remove archived items from the response, and it does.
  The problem is that it keeps them as a nested field inside the parent entry.
  Archived entries can only be filtered knowing the exact nesting of the fields, so as a solution we remove those invalid entries by hand. an invalid entry is the one that only has a `sys` field.
  For more info: https://www.contentful.com/developers/docs/tutorials/general/determine-entry-asset-state/
*/
const removeEntriesWithoutFields: <T>(entry: Entry<T>) => Entry<T> | null = (
  entry
) => {
  if ('sys' in entry && Object.keys(entry).length === 1) {
    return null;
  }

  const entries = entry.fields
    ? Object.entries(entry.fields)
        .map(([key, value]: [string, Entry<unknown>]) => {
          let filteredValue;
          if (Array.isArray(value)) {
            if (typeof value[0] !== 'object' || !Array.isArray(value)) {
              filteredValue = value;
            } else {
              filteredValue = value
                .filter((child) => !!(child as Entry<unknown>).fields)
                .map(removeEntriesWithoutFields);
            }
          } else if (typeof value === 'object') {
            filteredValue = removeEntriesWithoutFields(value);
          } else {
            filteredValue = value;
          }

          return [key, filteredValue];
        })

        .filter(([, value]) => !!value)
    : [];

  const filteredFields = Object.fromEntries(entries) as Record<string, unknown>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { ...entry, fields: filteredFields } as Entry<any>;
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
