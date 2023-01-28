// translate untranslated messages from EN to languages specified in next.config.js
import { readFile, writeFile } from 'fs/promises';

import { translate } from '../src/lib/translation/deepl';

import {
  defaultLanguage,
  encoding,
  languages,
  readTranslationFile,
  resolveTranslationFilePath,
} from './_util';

async function translateLocalMessages() {
  await ensureTranslationFileAvailability();

  const referenceTranslationFile = await readTranslationFile(defaultLanguage);

  const translationIds = Object.keys(referenceTranslationFile);

  await Promise.all(
    languages
      .filter((l) => l !== defaultLanguage)
      .map(async (language) => {
        const translationFile = await readTranslationFile(language);

        for (const translationId of translationIds) {
          if (translationFile[translationId]) {
            continue;
          }

          try {
            translationFile[translationId] = {
              defaultMessage: await translate(
                referenceTranslationFile[translationId].defaultMessage,
                language
              ),
            };
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }

          await writeFile(
            resolveTranslationFilePath(language),
            JSON.stringify(translationFile, undefined, 2),
            { encoding }
          );
        }
      })
  );
}

async function ensureTranslationFileAvailability() {
  await Promise.all(
    languages.map(async (language) => {
      const path = resolveTranslationFilePath(language);

      try {
        const content = await readFile(path, { encoding });

        if (content.length === 0) {
          throw new Error('Empty File');
        }

        JSON.parse(content);
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          (('code' in error &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore ts-node is dumb
            error.code === 'ENOENT') ||
            ('message' in error &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore ts-node is dumb
              error.message === 'Empty File'))
        ) {
          await writeFile(path, '{}', { encoding });
        } else {
          throw error;
        }
      }
    })
  );
}

void translateLocalMessages();
