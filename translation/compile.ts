import { dirname, relative, resolve } from 'path';
import { writeFile } from 'fs/promises';

import { compile } from '@formatjs/cli-lib';
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
  resolveTranslationFilePath,
  encoding,
} from './_util';

void main();

const stringRecordSchema = z.record(z.string(), z.string());

async function main() {
  await Promise.all(
    locales.map(async (locale) => {
      const compiledMessages = await compile([
        resolveTranslationFilePath(locale === 'dev' ? defaultLocale : locale),
      ]);

      const updatedMessages = noramlizeCompiledMessagesForLocale(
        compiledMessages,
        locale
      );

      await writeFile(
        resolveCompiledTranslationFilePath(locale),
        JSON.stringify(updatedMessages),
        { encoding }
      );

      await ensureTranslationFileUsage(locale);
    })
  );
}

function noramlizeCompiledMessagesForLocale(
  compiledMessages: string,
  locale: string
) {
  const parsedMessages = stringRecordSchema.parse(JSON.parse(compiledMessages));

  if (locale === 'dev') {
    return createDevTranslations(parsedMessages);
  }

  return removeTranslationIgnoreTagsFromCompiledMessages(parsedMessages);
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
