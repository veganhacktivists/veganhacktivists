import type { Entry } from 'contentful';
import client, { getContents, previewClient } from '.';
import type {
  IBlogEntry,
  IBlogEntryFields,
  IProjectFields,
  ITeamFields,
} from '../../types/generated/contentful';

export const getBlogPreviewBySlug: (slug: string) => Promise<IBlogEntry> =
  async (slug) => {
    const response = await previewClient.getEntries({
      'fields.slug': slug,
      content_type: 'blogEntry',
    });

    return response.items[0] as IBlogEntry;
  };

export const getAllBlogSlugs: () => Promise<IBlogEntry['fields']['slug'][]> =
  async () => {
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

export const getFeaturedProjects: () => Promise<Entry<IProjectFields>[]> =
  async () => {
    const projects = await getContents<IProjectFields>({
      contentType: 'project',
      query: {
        isFeatured: true,
      },
      other: {
        order: '-fields.date',
      },
    });

    return projects;
  };

export const getBlogEntries: (
  limit?: number
) => Promise<Entry<IBlogEntryFields>[]> = async (limit) => {
  const fields =
    'sys.createdAt,fields.publishDate,fields.featuredImage,fields.title,fields.slug,fields.excerpt,fields.content,fields.tags';

  const [newBlogs, oldBlogs] = await Promise.all([
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
  ]);

  return [...newBlogs, ...oldBlogs].slice(0, limit);
};

// export const getlastBlogEntries: (limit?: number) => Promise<IBlogEntry[]> =
//   async (limit = 3) => {
//     const lastEntries = await getContents<IBlogEntryFields>({
//       contentType: 'blogEntry',
//       other: { limit, sort:"" },
//     });
//   };
