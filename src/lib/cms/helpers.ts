import type { Entry } from 'contentful';
import client, { getContents, previewClient } from '.';
import type {
  IBlogEntry,
  IBlogEntryFields,
  ITeamFields,
  ITeamMember,
  ITeamMemberFields,
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
  const teams = await getContents<ITeamFields>('team', {
    // 'isInactive[ne]': true,
    ne: { isInactive: true },
  });

  return teams;
};

export const getActiveTeamMemebrs: () => Promise<Entry<ITeamMemberFields>[]> =
  async () => {
    const teams = await getContents<ITeamMemberFields>('team', {
      ne: {
        'team.fields.isInactive': false,
      },
    });

    return teams;
  };
