import { dirname, relative, resolve } from 'path';
import { writeFile } from 'fs/promises';

import {
  IndentationText,
  Project,
  QuoteKind,
  StructureKind,
  SyntaxKind,
} from 'ts-morph';
import { z } from 'zod';

import {
  defaultLocale,
  locales,
  repoDirectory,
  resolveCompiledTranslationFilePath,
  encoding,
  readTranslationFile,
} from './_util';

import type { TranslationFileStructureInternal } from './_util';

void main();

const stringRecordSchema = z.record(z.string(), z.string());

async function main() {
  const defaultTranslationMessages = await readTranslationFile(defaultLocale);
  const compiledDefaultTranslationMessages = compile(
    defaultTranslationMessages
  );

  await Promise.all(
    locales.map(async (locale) => {
      // ids of defaultLocale file are used for dev translations
      const compiledMessages =
        locale === 'dev' || locale === defaultLocale
          ? compiledDefaultTranslationMessages
          : compile(await readTranslationFile(locale));

      applyTranslationFallback(
        compiledMessages,
        compiledDefaultTranslationMessages
      );

      const updatedMessages =
        locale === 'dev'
          ? createDevTranslations(compiledMessages)
          : removeTranslationIgnoreTagsFromCompiledMessages(compiledMessages);

      await writeFile(
        resolveCompiledTranslationFilePath(locale),
        JSON.stringify(updatedMessages),
        { encoding }
      );

      await ensureTranslationFileUsage(locale);
    })
  );
}

function applyTranslationFallback(
  compiledMessages: Record<string, string>,
  fallbackMessages: Record<string, string>
): void {
  Object.entries(fallbackMessages).forEach(([id, message]) => {
    if (!compiledMessages[id]) {
      compiledMessages[id] = message;
    }
  });
}

function compile(
  translations: TranslationFileStructureInternal
): Record<string, string> {
  return stringRecordSchema.parse(
    Object.fromEntries(
      Object.entries(translations).map(([key, { message }]) => [key, message])
    )
  );
}

function createDevTranslations(
  compiledMessages: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.keys(compiledMessages).map((key) => [key, key])
  );
}

const project = new Project({
  manipulationSettings: {
    quoteKind: QuoteKind.Single,
    indentationText: IndentationText.TwoSpaces,
    useTrailingCommas: true,
  },
});
const messagesSourceFilePath = resolve(
  repoDirectory,
  'src/lib/translation/messages.ts'
);
project.addSourceFileAtPath(messagesSourceFilePath);

async function ensureTranslationFileUsage(locale: string) {
  const filepath = relative(
    dirname(messagesSourceFilePath),
    resolveCompiledTranslationFilePath(locale)
  );

  const sourceFile = project.getSourceFiles()[0];

  const hasImport = sourceFile
    .getImportDeclarations()
    .map((x) => x.getModuleSpecifier().getText())
    .includes(`'${filepath}'`);

  if (hasImport) {
    return;
  }

  sourceFile.addImportDeclaration({
    defaultImport: locale,
    moduleSpecifier: filepath,
  });

  if (locale === 'dev') {
    sourceFile
      .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0]
      .addSpreadAssignment({
        expression: "(process.env.NODE_ENV === 'development' && { dev })",

        kind: StructureKind.SpreadAssignment,
      });
  } else {
    sourceFile
      .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0]
      .addProperty({
        name: locale,
        kind: StructureKind.ShorthandPropertyAssignment,
      });
  }

  await project.save();
}

function removeTranslationIgnoreTagsFromCompiledMessages(
  messages: Record<string, string>
) {
  return Object.entries(messages).reduce(
    (msgs, [key, msg]) => ({
      ...msgs,
      [key]: removeTranslationIgnoreTags(msg),
    }),
    {}
  );
}

function removeTranslationIgnoreTags(messageContent: string) {
  return messageContent.replaceAll(
    /< *no-localization *>(.*?)<\/ *no-localization *>/g,
    '$1'
  );
}
