// Extract new localisations using 'formatjs extract'

import { promisify } from 'util';
import { readFile, writeFile } from 'fs/promises';

import { compileAndWrite, extract } from '@formatjs/cli-lib';
import { glob } from 'glob';

import {
  defaultLocalisationPath,
  validationSchema,
  encoding,
  repoDirectory,
  defaultCompiledLocalisationPath,
  filesGlob,
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
    defaultLocalisationPath
  );
  const mergedTranslations = addNewTranslationsToCurrent(
    currentTranslations,
    extractedTranslations
  );

  await writeFile(
    defaultLocalisationPath,
    JSON.stringify(mergedTranslations, undefined, 2),
    { encoding }
  );

  await compileAndWrite([defaultLocalisationPath], {
    outFile: defaultCompiledLocalisationPath,
  });
}

function addNewTranslationsToCurrent(
  currentTranslations: TranslationFileStructure = {},
  extractedTranslations: TranslationFileStructure
): TranslationFileStructure {
  return Object.keys(extractedTranslations).reduce((translations, id) => {
    if (!translations[id]) {
      translations[id] = extractedTranslations[id];
    } else if (
      translations[id].defaultMessage !==
      extractedTranslations[id].defaultMessage
    ) {
      // eslint-disable-next-line no-console
      console.error(
        `defaultMessage of existing translation changed. Existing translation messages must be set in ${defaultLocalisationPath}\n${id}\ncurrent: ${translations[id].defaultMessage}\nchanged: ${extractedTranslations[id].defaultMessage}`
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
