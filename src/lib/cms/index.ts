import type { CONTENT_TYPE } from '../../types/generated/contentful';
import type { Entry } from 'contentful';
import { createClient } from 'contentful';
import type { ContentfulClientApi } from 'contentful';

let client: ContentfulClientApi;

export const getClient = (): ContentfulClientApi => {
  if (!client) {
    client = createClient({
      space: process.env.CF_SPACE_ID || '',
      accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN || '',
    });
  }
  return client;
};

let previewClient: ContentfulClientApi;

export const getPreviewClient = (): ContentfulClientApi => {
  if (!previewClient) {
    previewClient = createClient({
      space: process.env.CF_SPACE_ID || '',
      accessToken: process.env.CF_PREVIEW_ACCESS_TOKEN || '',
      host: 'preview.contentful.com',
    });
  }
  return previewClient;
};

export const getById: <T>(id: string) => Promise<Entry<T>> = async (id) => {
  return await getClient().getEntry(id);
};

export const getContents: <T>(options: {
  contentType: CONTENT_TYPE;
  query?: Record<string, unknown> & { ne?: Record<string, unknown> };
  other?: Record<string, unknown>;
}) => Promise<Entry<T>[]> = async ({ contentType, query = {}, other }) => {
  const { ne, ...eqFilter } = query;

  const normalizedNeFilter = Object.fromEntries(
    Object.entries(ne || {}).map(([value, filter]) => [`${value}[ne]`, filter])
  );

  const fieldsQuery = Object.fromEntries(
    Object.entries({ ...eqFilter, ...normalizedNeFilter }).map(
      ([field, value]) => [`fields.${field}`, value]
    )
  );

  const response = await getClient().getEntries({
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
  const entries = await getClient().getEntries({
    content_type: pageContentType,
    select: 'sys.id',
  });

  return entries.items.map((entry) => entry.sys.id);
};
