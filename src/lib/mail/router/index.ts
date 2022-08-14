export const OUR_EMAIL = process.env.EMAIL_TO!;

const projectSpecificEmails: Record<string, string[]> = {
  [process.env.EMAIL_TO_AVOCADO!]: ['veganhacktivists.org'],
  [process.env.EMAIL_TO_BANANA!]: ['vegan bootcamp'],
  [process.env.EMAIL_TO_CARROT!]: ['5m5v', '5 vegans', '5vegans'],
  [process.env.EMAIL_TO_CHEATSHEET!]: ['cheatsheet'],
  [process.env.EMAIL_TO_SWEET_POTATO!]: ['vegan linguist'],
  [process.env.EMAIL_TO_WATERMELON!]: ['activist hub'],
};

export const determineEmailRecipients = (message: string) => {
  return Object.keys(projectSpecificEmails).filter((email) =>
    projectSpecificEmails[email].some((keyword) => message.includes(keyword))
  );
};
