import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { z } from 'zod';

export const filesGlob = 'src/**/*.tsx';
export const defaultLocale = 'en';
export const defaultLocalisationPath = `${__dirname}/data/${defaultLocale}.json`;
export const defaultCompiledLocalisationPath = `${__dirname}/data/compiled-${defaultLocale}.json`;
export const encoding = 'utf-8';
export const repoDirectory = resolve(__dirname, '..');

export const validationSchema = z.record(
  z.string(),
  z.object({
    defaultMessage: z.string(),
  })
);

export type TranslationFileStructure = z.infer<typeof validationSchema>;

export async function getTranslationsFromFile(
  path: string
): Promise<TranslationFileStructure> {
  try {
    const contents = await readFile(path, { encoding });

    return validationSchema.parse(JSON.parse(contents));
  } catch {
    return {};
  }
}
