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
} from './_util';

import type { TranslationFileStructureInternal } from './_util';

void main();

async function main() {
  const files = await promisify(glob)(filesGlob, {
    cwd: repoDirectory,
  });

  const resultAsString = await extract(files, {});

  const extractedTranslations = mapFormatJSTranslationsToInternalFormat(
    validationSchemaFormatJS.parse(JSON.parse(resultAsString))
  );
  const currentTranslations = await getTranslationsFromFile(
    defaultTranslationPath
  );
  const mergedTranslations = addNewTranslationsToCurrent(
    currentTranslations,
    extractedTranslations
  );
  const updatedTranslations = stripObsoleteTranslations(
    mergedTranslations,
    Object.keys(extractedTranslations)
  );

  await writeTranslationFile(updatedTranslations, defaultLocale);
}

function addNewTranslationsToCurrent(
  currentTranslations: TranslationFileStructureInternal = {},
  extractedTranslations: TranslationFileStructureInternal
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
    currentTranslations
  );

  const changedTranslationsEntries = Object.entries(changedTranslations);
  if (changedTranslationsEntries.length) {
    // eslint-disable-next-line no-console
    console.error(
      `message of existing translation(s) changed:\n${changedTranslationsEntries
        .map(
          ([id, [current, changed]]) => `[${id}]: "${current}" -> "${changed}"`
        )
        .join(
          '\n'
        )}\n\nExisting translation messages must be set in ${defaultTranslationPath}\n`
    );
  }

  return updatedTranslations;
}

async function getTranslationsFromFile(
  path: string
): Promise<TranslationFileStructureInternal> {
  try {
    const contents = await readFile(path, { encoding });

    return validationSchemaInternal.parse(JSON.parse(contents));
  } catch {
    return {};
  }
}
