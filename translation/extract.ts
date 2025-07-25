// Extract new translations using 'formatjs extract'

import { promisify } from 'util';
import { readFile } from 'fs/promises';

import { extract } from '@formatjs/cli-lib';
import { glob } from 'glob';

import {
  defaultTranslationPath,
  validationSchemaFormatJS,
  encoding,
  repoDirectory,
  filesGlob,
  warnIfIdInvalid,
  writeTranslationFile,
  defaultLocale,
  stripObsoleteTranslations,
  validationSchemaInternal,
  mapFormatJSTranslationsToInternalFormat,
  resolveTranslationFilePath,
  locales,
} from './_util';

import type { TranslationFileStructureInternal } from './_util';

void main();

async function main() {
  const files = await promisify(glob)(filesGlob, {
    cwd: repoDirectory,
  });

  const resultAsString = await extract(files as string[], {});

  const extractedTranslations = mapFormatJSTranslationsToInternalFormat(
    validationSchemaFormatJS.parse(JSON.parse(resultAsString)),
  );
  const currentTranslations = await getTranslationsFromFile(
    defaultTranslationPath,
  );
  const mergedTranslations = addNewTranslationsToCurrent(
    currentTranslations,
    extractedTranslations,
  );

  await writeTranslationFile(mergedTranslations, defaultLocale);

  await removeObsoleteTranslationsFromTranslationFiles(
    Object.keys(extractedTranslations),
  );
}

async function removeObsoleteTranslationsFromTranslationFiles(
  currentTranslationIds: string[],
) {
  await Promise.all(
    locales.map(async (locale) => {
      const currentTranslations = await getTranslationsFromFile(
        resolveTranslationFilePath(locale),
      );

      const updatedTranslations = stripObsoleteTranslations(
        currentTranslations,
        currentTranslationIds,
      );

      await writeTranslationFile(updatedTranslations, locale);
    }),
  );
}

function addNewTranslationsToCurrent(
  currentTranslations: TranslationFileStructureInternal = {},
  extractedTranslations: TranslationFileStructureInternal,
): TranslationFileStructureInternal {
  // used to warn about changed translations
  const changedTranslations: Record<
    string,
    [current: string, changed: string]
  > = {};

  const updatedTranslations = Object.keys(extractedTranslations).reduce(
    (translations, id) => {
      warnIfIdInvalid(id);

      if (!translations[id]) {
        translations[id] = extractedTranslations[id];
      } else if (
        translations[id].message !== extractedTranslations[id].message
      ) {
        changedTranslations[id] = [
          translations[id].message,
          extractedTranslations[id].message,
        ];
      }
      return translations;
    },
    currentTranslations,
  );

  const changedTranslationsEntries = Object.entries(changedTranslations);
  if (changedTranslationsEntries.length) {
    console.error(
      `message of existing translation(s) changed:\n${changedTranslationsEntries
        .map(
          ([id, [current, changed]]) => `[${id}]: "${current}" -> "${changed}"`,
        )
        .join(
          '\n',
        )}\n\nExisting translation messages must be set in ${defaultTranslationPath}\n`,
    );
  }

  return updatedTranslations;
}

async function getTranslationsFromFile(
  path: string,
): Promise<TranslationFileStructureInternal> {
  try {
    const contents = await readFile(path, { encoding });

    return validationSchemaInternal.parse(JSON.parse(contents));
  } catch {
    return {};
  }
}
