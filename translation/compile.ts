import { dirname, relative, resolve } from 'path';

import { compileAndWrite } from '@formatjs/cli-lib';
import {
  IndentationText,
  Project,
  QuoteKind,
  StructureKind,
  SyntaxKind,
} from 'ts-morph';

import {
  languages,
  repoDirectory,
  resolveCompiledTranslationFilePath,
  resolveTranslationFilePath,
} from './_util';

void main();

function main() {
  return Promise.all(
    languages.map(async (l) => {
      await compileAndWrite([resolveTranslationFilePath(l)], {
        outFile: resolveCompiledTranslationFilePath(l),
      });

      await ensureTranslationFileUsage(l);
    })
  );
}

const messagesSourceFilePath = resolve(
  repoDirectory,
  'src/lib/translation/messages.ts'
);
const project = new Project({
  manipulationSettings: {
    quoteKind: QuoteKind.Single,
    indentationText: IndentationText.TwoSpaces,
    useTrailingCommas: true,
  },
});
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

  sourceFile
    .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0]
    .addProperty({
      name: language,
      kind: StructureKind.ShorthandPropertyAssignment,
    });

  await project.save();
}
