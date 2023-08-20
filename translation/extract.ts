// Extract new translations using 'formatjs extract'

import { promisify } from 'util';
import { readFile, writeFile } from 'fs/promises';

import { extract } from '@formatjs/cli-lib';
import { glob } from 'glob';

import {
  defaultTranslationPath,
  validationSchema,
  encoding,
  repoDirectory,
  filesGlob,
  warnIfIdInvalid,
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

  await writeFile(
    defaultTranslationPath,
    JSON.stringify(mergedTranslations, undefined, 2),
    { encoding }
  );
}

function addNewTranslationsToCurrent(
  currentTranslations: TranslationFileStructure = {},
  extractedTranslations: TranslationFileStructure
): TranslationFileStructure {
  return Object.keys(extractedTranslations).reduce((translations, id) => {
    warnIfIdInvalid(id);

    if (!translations[id]) {
      translations[id] = extractedTranslations[id];
    } else if (
      translations[id].defaultMessage !==
      extractedTranslations[id].defaultMessage
    ) {
      // eslint-disable-next-line no-console
      console.error(
        `defaultMessage of existing translation changed. Existing translation messages must be set in ${defaultTranslationPath}\n${id}\ncurrent: ${translations[id].defaultMessage}\nchanged: ${extractedTranslations[id].defaultMessage}`
      );
    }
    return translations;
  }, currentTranslations);
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
