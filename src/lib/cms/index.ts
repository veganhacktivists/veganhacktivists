import type { Entry } from 'contentful';
import { createClient } from 'contentful';

type Slug = string;

const client = createClient({
  space: process.env['CF_SPACE_ID'] || '',
  accessToken: process.env['CF_DELIVERY_ACCESS_TOKEN'] || '',
});

export const previewClient = createClient({
  space: process.env['CF_SPACE_ID'] || '',
  accessToken: process.env['CF_PREVIEW_ACCESS_TOKEN'] || '',
  host: 'preview.contentful.com',
});

export const getById: <T>(id: Slug) => Promise<Entry<T>> = async (id) => {
  return await client.getEntry(id);
};

export const getAllIdsOfType: (
  pageContentType: string
) => Promise<Entry<unknown>['sys']['id'][]> = async (pageContentType) => {
  const entries = await client.getEntries({
    content_type: pageContentType,
    select: 'sys.id',
  });

  return entries.items.map((entry) => entry.sys.id);
};

export default client;
