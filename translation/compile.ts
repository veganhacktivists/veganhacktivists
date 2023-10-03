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
  defaultLanguage,
  encoding,
  languages,
  repoDirectory,
  resolveCompiledTranslationFilePath,
  resolveTranslationFilePath,
} from './_util';

void main();

const stringRecordSchema = z.record(z.string(), z.string());

function main() {
  return Promise.all(
    languages.map(async (lang) => {
      const compiledMessages = await compile([
        resolveTranslationFilePath(lang === 'dev' ? defaultLanguage : lang),
      ]);

      const updatedMessages = noramlizeCompiledMessagesForLang(
        compiledMessages,
        lang
      );

      await writeFile(
        resolveCompiledTranslationFilePath(lang),
        JSON.stringify(updatedMessages),
        { encoding }
      );

      await ensureTranslationFileUsage(lang);
    })
  );
}

function noramlizeCompiledMessagesForLang(
  compiledMessages: string,
  lang: string
) {
  const parsedMessages = stringRecordSchema.parse(JSON.parse(compiledMessages));

  if (lang === 'dev') {
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

async function ensureTranslationFileUsage(language: string) {
  const filepath = relative(
    dirname(messagesSourceFilePath),
    resolveCompiledTranslationFilePath(language)
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
    defaultImport: language,
    moduleSpecifier: filepath,
  });

  if (language === 'dev') {
    sourceFile
      .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0]
      .addSpreadAssignment({
        expression: "(process.env.NODE_ENV !== 'production' && { dev })",

        kind: StructureKind.SpreadAssignment,
      });
  } else {
    sourceFile
      .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0]
      .addProperty({
        name: language,
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
