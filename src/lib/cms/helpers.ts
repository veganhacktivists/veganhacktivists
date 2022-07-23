import client, { getContents, previewClient } from '.';

import type { Entry } from 'contentful';
import type {
  IBlogEntry,
  IBlogEntryFields,
  IDocsCategory,
  IDocsCategoryFields,
  IProjectFields,
  ITeamFields,
} from '../../types/generated/contentful';

export const getDocCategoryPreviewBySlug: (
  slug: IDocsCategoryFields['slug']
) => Promise<IDocsCategory> = async (slug) => {
  const response = await previewClient.getEntries({
    'fields.slug': slug,
    content_type: 'docsCategory',
    include: 4,
    limit: 1,
  });

  return response.items[0] as IDocsCategory;
};

export const getBlogPreviewBySlug: (
  slug: string
) => Promise<IBlogEntry> = async (slug) => {
  const response = await previewClient.getEntries({
    'fields.slug': slug,
    content_type: 'blogEntry',
    include: 3,
  });

  return response.items[0] as IBlogEntry;
};

export const getAllBlogSlugs: () => Promise<
  IBlogEntry['fields']['slug'][]
> = async () => {
  const entries = await client.getEntries({
    content_type: 'blogEntry',
    select: 'fields.slug',
  });

  return (entries.items as Entry<IBlogEntryFields>[]).map(
    (entry) => entry.fields.slug
  );
};

export const getActiveTeams: () => Promise<Entry<ITeamFields>[]> = async () => {
  const teams = await getContents<ITeamFields>({
    contentType: 'team',
    query: {
      filters: {
        ne: { isInactive: true },
      },
    },
  });

  return teams;
};

export const getProjects: () => Promise<Entry<IProjectFields>[]> = async () => {
  const projects = await getContents<IProjectFields>({
    contentType: 'project',
    other: {
      order: '-fields.date',
    },
  });

  return projects;
};

export const getFeaturedProjects: () => Promise<
  Entry<IProjectFields>[]
> = async () => {
  const projects = await getContents<IProjectFields>({
    contentType: 'project',
    query: {
      isFeatured: true,
    },
    other: {
      order: '-fields.date',
      limit: 8,
    },
  });

  return projects;
};

export const getBlogEntries: (
  limit?: number
) => Promise<Entry<IBlogEntryFields>[]> = async (limit) => {
  const fields =
    'sys.createdAt,fields.publishDate,fields.featuredImage,fields.title,fields.slug,fields.excerpt,fields.tags';

  const [dateBlogs, noDateBlogs] = await Promise.all([
    getContents<IBlogEntryFields>({
      contentType: 'blogEntry',
      query: {
        filters: {
          exists: { publishDate: true },
        },
      },
      other: {
        order: '-fields.publishDate',
        select: fields,
        limit,
      },
    }),
    getContents<IBlogEntryFields>({
      contentType: 'blogEntry',
      query: {
        filters: {
          exists: { publishDate: false },
        },
      },
      other: {
        order: '-sys.createdAt',
        select: fields,
        limit,
      },
    }),
  ]);

  const allBlogs = [...dateBlogs, ...noDateBlogs];

  allBlogs.sort((a, b) => {
    const dateA = new Date(a.fields.publishDate || a.sys.createdAt);
    const dateB = new Date(b.fields.publishDate || b.sys.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return allBlogs.slice(0, limit);
};
