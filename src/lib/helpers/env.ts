export const getListFromEnv = (key: string, separator = ',') => {
  const envVar = process.env[key];
  if (!envVar) {
    return [];
  }
  return envVar.split(separator);
};
