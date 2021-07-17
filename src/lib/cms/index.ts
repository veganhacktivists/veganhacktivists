// import type { Entry } from 'contentful';
// import { createClient } from 'contentful';

// type AvaliableContentTypes = 'team' | 'teamMember';

// const client = createClient({
//   space: process.env['CF_SPACE_ID'] || '',
//   accessToken: process.env['CF_DELIVERY_ACCESS_TOKEN'] || '',
// });

// export const previewClient = createClient({
//   space: process.env['CF_SPACE_ID'] || '',
//   accessToken: process.env['CF_PREVIEW_ACCESS_TOKEN'] || '',
//   host: 'preview.contentful.com',
// });

// export const getById: <T>(id: string) => Promise<Entry<T>> = async (id) => {
//   return await client.getEntry(id);
// };

// export const getAllOfType: (
//   pageContentType: AvaliableContentTypes
// ) => Promise<unknown[]> = async (pageContentType) => {
//   const entries = await client.getEntries({
//     content_type: pageContentType,
//   });

//   return entries.items;
// };

// export const getAllIdsOfType: (
//   pageContentType: AvaliableContentTypes
// ) => Promise<Entry<unknown>['sys']['id'][]> = async (pageContentType) => {
//   const entries = await client.getEntries({
//     content_type: pageContentType,
//     select: 'sys.id',
//   });

//   return entries.items.map((entry) => entry.sys.id);
// };

// export default client;
export {};
