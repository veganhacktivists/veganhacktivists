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
