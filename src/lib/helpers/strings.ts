export const firstLetterUppercase: (str: string) => string = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const toBaseUrl: (url: string) => string = (url) => {
  return url.split('/')[0];
};
