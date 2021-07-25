import type { CONTENT_TYPE } from '../../@types/generated/contentful';
import type { Entry, EntryCollection } from 'contentful';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env['CF_SPACE_ID'] || '',
  accessToken: process.env['CF_DELIVERY_ACCESS_TOKEN'] || '',
});

export const previewClient = createClient({
  space: process.env['CF_SPACE_ID'] || '',
  accessToken: process.env['CF_PREVIEW_ACCESS_TOKEN'] || '',
  host: 'preview.contentful.com',
});

export const getById: <T>(id: string) => Promise<Entry<T>> = async (id) => {
  return await client.getEntry(id);
};

export const getContents = async <T>(
  contentType: CONTENT_TYPE,
  queries?: Record<string, unknown>
): Promise<Entry<T>[]> => {
  const response = await client.getEntries({
    content_type: contentType,
    ...queries,
  });
  return response.items as Entry<T>[];
  // return response.items.map((entry: Entry<unknown>) => entry.fields as T);
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
