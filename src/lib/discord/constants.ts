import type { PlaygroundRequestCategory } from '@prisma/client';

export const JOIN_PLAYGROUND_URL = 'https://discord.gg/vhplayground';

export const ROLE_ID_BY_CATEGORY: Partial<
  Record<PlaygroundRequestCategory, string>
> = {
  Developer: process.env.DISCORD_DEVELOPER_ROLE_ID,
  Designer: process.env.DISCORD_DESIGNER_ROLE_ID,
  Writer: process.env.DISCORD_WRITER_ROLE_ID,
  Editor: process.env.DISCORD_EDITOR_ROLE_ID,
  Researcher: process.env.DISCORD_RESEARCHER_ROLE_ID,
  Marketer: process.env.DISCORD_MARKETER_ROLE_ID,
  DataScientist: process.env.DISCORD_DATA_ROLE_ID,
  Social: process.env.DISCORD_SOCIAL_ROLE_ID,
  Security: process.env.DISCORD_SECURITY_ROLE_ID,
};
