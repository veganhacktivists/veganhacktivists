import { doesContainKeywords } from 'lib/helpers/strings';

export const OUR_EMAIL_FROM =
  process.env.EMAIL_FROM ?? 'hello@veganhacktivists.org';
export const OUR_EMAIL_TO =
  process.env.EMAIL_TO ?? 'hello@veganhacktivists.org';
export const PLAYGROUND_TO_CC = process.env.EMAIL_TO_PLAYGROUND_CC ?? '';
export const OUR_EMAIL_FROM_FORMATTED =
  `Vegan Hacktivists <${OUR_EMAIL_FROM}>` as const;
export const PLAYGROUND_EMAIL =
  process.env.EMAIL_PLAYGROUND ?? 'playground@veganhacktivists.org';
export const PLAYGROUND_EMAIL_FORMATTED =
  `VH Playground <${PLAYGROUND_EMAIL}>` as const;
export const FLAVIA_EMAIL = 'flavia@veganhacktivists.org';
export const FLAVIA_EMAIL_FORMATTED = `Flavia <${FLAVIA_EMAIL}>`;
export const KATE_EMAIL = 'kate@veganhacktivists.org';
export const KATE_EMAIL_FORMATTED = `Kate <${KATE_EMAIL}>`;
export const JAMES_EMAIL = 'james@veganhacktivists.org';
export const JAMES_EMAIL_FORMATTED = `James <${JAMES_EMAIL}>`;

const projectSpecificEmails: Record<string, (string | string[])[]> = {
  [process.env.EMAIL_TO_AVOCADO!]: [],
  [process.env.EMAIL_TO_BANANA!]: [['vegan', 'bootcamp']],
  [process.env.EMAIL_TO_CARROT!]: [
    '5m5v',
    ['minutes', 'vegans'],
    ['watch', 'dominion'],
    'watchdominion',
  ],
  [process.env.EMAIL_TO_CHEATSHEET!]: ['cheatsheet'],
  [process.env.EMAIL_TO_STRAWBERRY!]: [
    'animalsupportbot',
    'veganactivismbot',
    ['animal', 'support', 'bot'],
    ['artificial', 'intellegence'],
    ['machine', 'learning'],
    ['vegan', 'activism', 'bot'],
  ],
  [process.env.EMAIL_TO_SWEET_POTATO!]: [['vegan', 'linguists']],
  [process.env.EMAIL_TO_WATERMELON!]: ['activist hub'],
};

export const determineEmailRecipients = (message: string) => {
  const tokens = message.toLocaleLowerCase().split(/[^\d\w]/gi);

  return Object.keys(projectSpecificEmails).filter((email) =>
    doesContainKeywords(tokens, projectSpecificEmails[email])
  );
};
