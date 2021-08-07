import type {
  CONTENT_TYPE,
  IBlogEntry,
} from '../../types/generated/contentful';
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

export const getBlogPreviewBySlug: (slug: string) => Promise<IBlogEntry> =
  async (slug) => {
    const response = await previewClient.getEntries({
      'fields.slug': slug,
      content_type: 'blogEntry',
    });

    return response.items[0] as IBlogEntry;
  };

export const getContents: <T>(
  contentType: CONTENT_TYPE,
  query?: Record<string, unknown>
) => Promise<Entry<T>[]> = async (contentType, query = {}) => {
  const fieldsQuery = Object.fromEntries(
    Object.entries(query).map(([field, value]) => [`fields.${field}`, value])
  );

  const response = await client.getEntries({
    content_type: contentType,
    ...fieldsQuery,
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
