// translate untranslated messages from EN to locales specified in next.config.js
import { readFile, stat } from 'fs/promises';

import { translate } from './deepl';
import {
  defaultLocale,
  encoding,
  locales,
  readTranslationFile,
  resolveTranslationFilePath,
  stripObsoleteTranslations,
  writeTranslationFile,
} from './_util';

void translateLocalMessages();

async function translateLocalMessages() {
  await ensureTranslationFileAvailability();

  const referenceTranslationFile = await readTranslationFile(defaultLocale);

  const translationIds = Object.keys(referenceTranslationFile);

  await Promise.all(
    locales
      .filter((l) => l !== defaultLocale)
      .map(async (locale) => {
        if (locale === 'dev') {
          return;
        }

        const translationFile = stripObsoleteTranslations(
          await readTranslationFile(locale),
          translationIds,
        );

        for (const translationId of translationIds) {
          if (translationFile[translationId]) {
            continue;
          }

          try {
            translationFile[translationId] = {
              message: await translate(
                referenceTranslationFile[translationId].message,
                locale,
              ),
            };
          } catch (error) {
            console.error(error);
          }

          await writeTranslationFile(translationFile, locale);
        }
      }),
  );
}

async function fileExists(path: string) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function ensureTranslationFileAvailability() {
  await Promise.all(
    locales.map(async (locale) => {
      if (locale === 'dev') {
        return;
      }

      const path = resolveTranslationFilePath(locale);

      let translationFileNotExistsOrInvalid = false;

      if (await fileExists(path)) {
        const content = await readFile(path, { encoding });

        if (content.length === 0) {
          translationFileNotExistsOrInvalid = true;
        } else {
          try {
            JSON.parse(content);
          } catch {
            translationFileNotExistsOrInvalid = true;
          }
        }
      } else {
        translationFileNotExistsOrInvalid = true;
      }

      if (translationFileNotExistsOrInvalid) {
        await writeTranslationFile({}, locale);
      }
    }),
  );
}
