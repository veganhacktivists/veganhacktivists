import type { PlaygroundRequestCategory } from '@prisma/client';

export const CATEGORY_LABELS: Record<PlaygroundRequestCategory, string> = {
  Developer: 'Developer (coding, devops, sites, apps, etc)',
  Designer: 'Designer (logos, ui/ux, banners, figma, drawing, etc)',
  Writer: 'Writer (posts, interviews, guides, documentation, etc)',
  Editor: 'Editor (videos, producing, editing, animator, sound, etc)',
  Researcher: 'Researcher (conducting studies, writing reports, etc)',
  Translator: 'Translator (translating content, videos, websites, etc)',
  Marketer: 'Marketer (promotions, advertising, campaigns, etc)',
  Social: 'Social (managing social accounts on insta, twit, etc)',
  DataScientist:
    'Data Scientist (analyzing data, finding patterns, graphs, etc)',
  Security: 'Security (penetration tests, consulting, code reviews, etc)',
  Other: 'Other (anything else, please pick this category)',
};

export const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'] as const;

export const PRIORITIES_CLASSES = [
  { label: 'Low', className: 'bg-green' },
  { label: 'Medium', className: 'bg-yellow-orange' },
  { label: 'High', className: 'bg-orange' },
  { label: 'Urgent', className: 'bg-red' },
];
