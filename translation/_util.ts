import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

import { z } from 'zod';

const nextConfig = z
  .object({
    i18n: z.object({ locales: z.array(z.string()), defaultLocale: z.string() }),
  })
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .parse(require('../next.config.js'));

export const filesGlob = 'src/**/*.tsx';
export const defaultLocale = nextConfig.i18n.defaultLocale;
export const locales = nextConfig.i18n.locales;
export const defaultTranslationPath = resolveTranslationFilePath(defaultLocale);
export const defaultCompiledTranslationPath =
  resolveCompiledTranslationFilePath(defaultLocale);
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

export function resolveTranslationFilePath(locale: string) {
  return `${__dirname}/data/${locale}.json`;
}

export function resolveCompiledTranslationFilePath(locale: string) {
  return `${__dirname}/data/compiled-${locale}.json`;
}

export async function readTranslationFile(
  locale: string
): Promise<z.infer<typeof validationSchema>> {
  return getTranslationsFromFile(resolveTranslationFilePath(locale));
}

export async function writeTranslationFile(
  translations: TranslationFileStructure,
  locale: string
) {
  await writeFile(
    resolveTranslationFilePath(locale),
    JSON.stringify(sortTranslations(translations), undefined, 2) + '\n',
    { encoding }
  );
}

export function validateTranslationId(id: string) {
  return id.toLowerCase() === id && !/.*\s.*/.test(id);
}

export function warnIfIdInvalid(id: string) {
  if (!validateTranslationId(id)) {
    console.warn(
      'id must be lower cased in kebab-style and may not contain white spaces, invalid id:',
      id
    );
  }
}

export function sortTranslations(translations: TranslationFileStructure) {
  return Object.fromEntries(
    Object.entries(translations).sort(([keya], [keyb]) =>
      keya.localeCompare(keyb, 'en-US')
    )
  );
}

export function stripObsoleteTranslations(
  translations: TranslationFileStructure,
  validIds: string[]
) {
  return Object.fromEntries(
    Object.entries(translations).filter(([id]) => validIds.includes(id))
  );
}
