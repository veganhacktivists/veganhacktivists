import { doesContainKeywords } from 'lib/helpers/strings';

export const OUR_EMAIL = process.env.EMAIL_TO!;

const projectSpecificEmails: Record<string, (string | string[])[]> = {
  [process.env.EMAIL_TO_AVOCADO!]: [],
  [process.env.EMAIL_TO_BANANA!]: [['vegan', 'bootcamp']],
  [process.env.EMAIL_TO_CARROT!]: ['5m5v', ['5', 'minutes', 'vegans']],
  [process.env.EMAIL_TO_CHEATSHEET!]: ['cheatsheet'],
  [process.env.EMAIL_TO_SWEET_POTATO!]: [['vegan', 'linguist']],
  [process.env.EMAIL_TO_WATERMELON!]: ['activist hub'],
};

export const determineEmailRecipients = (message: string) => {
  const tokens = message.toLocaleLowerCase().split(' ');

  return Object.keys(projectSpecificEmails).filter((email) =>
    doesContainKeywords(tokens, projectSpecificEmails[email])
  );
};
