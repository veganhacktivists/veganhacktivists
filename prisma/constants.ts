import type { PlaygroundRequestCategory } from '@prisma/client';

export const CATEGORY_LABELS: Record<PlaygroundRequestCategory, string> = {
  Developer: 'Developer',
  Designer: 'Designer',
  Writer: 'Writer',
  Editor: 'Editor',
  Researcher: 'Researcher',
  Translator: 'Translator',
  Marketer: 'Marketer',
  Social: 'Social',
  DataScientist: 'Data Scientist',
  Security: 'Security',
  Other: 'Other',
};

export const CATEGORY_DESCRIPTION: Record<PlaygroundRequestCategory, string> = {
  Developer: 'coding, devops, sites, apps, etc',
  Designer: 'logos, ui/ux, banners, figma, drawing, etc',
  Writer: 'posts, interviews, guides, documentation, etc',
  Editor: 'videos, producing, editing, animator, sound, etc',
  Researcher: 'conducting studies, writing reports, etc',
  Translator: 'translating content, videos, websites, etc',
  Marketer: 'promotions, advertising, campaigns, seo, etc',
  Social: 'managing social accounts on insta, twit, etc',
  DataScientist: 'analyzing data, finding patterns, graphs, etc',
  Security: 'penetration tests, consulting, code reviews, etc',
  Other: 'anything else, please pick this category',
};
