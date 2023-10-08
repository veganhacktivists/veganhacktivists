// Extract new translations using 'formatjs extract'

import { promisify } from 'util';
import { readFile } from 'fs/promises';

import { extract } from '@formatjs/cli-lib';
import { glob } from 'glob';

import {
  defaultTranslationPath,
  validationSchema,
  encoding,
  repoDirectory,
  filesGlob,
  warnIfIdInvalid,
  writeTranslationsToFile,
  defaultLanguage,
} from './_util';

import type { TranslationFileStructure } from './_util';

void main();

async function main() {
  const files = await promisify(glob)(filesGlob, {
    cwd: repoDirectory,
  });

  const resultAsString = await extract(files, {});

  const extractedTranslations = validationSchema.parse(
    JSON.parse(resultAsString)
  );
  const currentTranslations = await getTranslationsFromFile(
    defaultTranslationPath
  );
  const mergedTranslations = addNewTranslationsToCurrent(
    currentTranslations,
    extractedTranslations
  );

  await writeTranslationsToFile(mergedTranslations, defaultLanguage);
}

function addNewTranslationsToCurrent(
  currentTranslations: TranslationFileStructure = {},
  extractedTranslations: TranslationFileStructure
): TranslationFileStructure {
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
        translations[id].defaultMessage !==
        extractedTranslations[id].defaultMessage
      ) {
        changedTranslations[id] = [
          translations[id].defaultMessage,
          extractedTranslations[id].defaultMessage,
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
      `defaultMessage of existing translation(s) changed:\n${changedTranslationsEntries
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
): Promise<TranslationFileStructure> {
  try {
    const contents = await readFile(path, { encoding });

    return validationSchema.parse(JSON.parse(contents));
  } catch {
    return {};
  }
}
