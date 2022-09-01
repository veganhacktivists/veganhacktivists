import { z } from 'zod';

export const getListFromEnv = (key: string, separator = ',') => {
  const envVar = process.env[key];
  if (!envVar) {
    return [];
  }
  return envVar.split(separator);
};

export const parseEnv = <T>(key: string, schema?: z.ZodSchema<T>) => {
  const envVar = process.env[key];
  if (envVar === undefined) {
    if (schema) {
      return schema.parse(envVar);
    }
    return z.string().parse(envVar);
  }

  const parsed = JSON.parse(envVar);

  if (schema) {
    return schema.parse(parsed);
  }
  return parsed as T;
};
