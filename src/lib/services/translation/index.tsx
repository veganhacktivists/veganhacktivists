import { createHash } from 'node:crypto';

import { renderToString } from 'react-dom/server';
import { TRPCError } from '@trpc/server';
import { BLOCKS, type Document } from '@contentful/rich-text-types';
import React from 'react';
import { z } from 'zod';

import RichText from '../../../components/decoration/richText';
import { defaultLocale } from '../../../../translation/defaultLocale';

import { getById } from 'lib/cms';

import type { getLocalizedHTMLSchema } from './schemas';

/**
 * Return cached value if available.
 * Else load Contentful entry,
 * extract original html,
 * store original html in cache,
 * translate original html,
 * store translated html in cache
 */
export const getLocalizedHTML = async ({
  contentfulId,
  fieldId,
  locale,
  contentType,
}: z.infer<typeof getLocalizedHTMLSchema>) => {
  try {
    const cachedTranslation =
      await prisma.contentfulTranslationCache.findUnique({
        where: {
          id: {
            contentfulId,
            fieldId,
            locale,
          },
        },
      });

    if (cachedTranslation) {
      return cachedTranslation.translatedHTML;
    }

    const existingOriginalTranslationCache =
      await prisma.contentfulTranslationCache.findUnique({
        where: {
          id: {
            contentfulId,
            fieldId,
            locale: defaultLocale,
          },
        },
      });

    let originalHTML: string;
    let originalHTMLHash: string;

    if (!existingOriginalTranslationCache) {
      const entry = await getById<Record<string, unknown>>(contentfulId);

      const originalValue = entry.fields[fieldId];
      const extractedOriginalHTML = getHTMLStringFromFieldValue(originalValue);

      if (extractedOriginalHTML === undefined) {
        console.error(
          `failed to get html string for contentfulId ${contentfulId}, fieldId ${fieldId}, contentType ${contentType} and locale ${locale}`,
        );
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      const generatedOriginalHTMLHash = getLocalizedHTMLHash(
        extractedOriginalHTML,
      );

      await prisma.contentfulTranslationCache.create({
        data: {
          contentfulId,
          contentType,
          fieldId,
          locale: defaultLocale,
          translatedHTML: extractedOriginalHTML,
          originalHTMLHash: generatedOriginalHTMLHash,
        },
      });

      if (locale === defaultLocale) {
        return extractedOriginalHTML;
      }

      originalHTML = extractedOriginalHTML;
      originalHTMLHash = generatedOriginalHTMLHash;
    } else {
      originalHTML = existingOriginalTranslationCache.translatedHTML;
      originalHTMLHash = existingOriginalTranslationCache.originalHTMLHash;
    }

    // locale mapping required? next locale -> deepl locale
    const translatedHTML = await translateHTML(originalHTML, locale);

    await prisma.contentfulTranslationCache.create({
      data: {
        contentfulId,
        contentType,
        fieldId,
        locale,
        translatedHTML,
        originalHTMLHash,
      },
    });

    return translatedHTML;
  } catch (e) {
    // return original if database is unavailable
    const entry = await getById<Record<string, unknown>>(contentfulId);
    return getHTMLStringFromFieldValue(entry.fields[fieldId]);
  }
};

export function getLocalizedHTMLHash(html: string): string {
  return createHash('sha256').update(html).digest('hex');
}

export function getHTMLStringFromFieldValue(
  value: unknown,
): string | undefined {
  if (isContentfulRichTextDocument(value)) {
    return renderToString(<RichText document={value} />);
  }

  if (typeof value === 'string') {
    return value;
  }
}

function isContentfulRichTextDocument(value: unknown): value is Document {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'nodeType' in value &&
      value.nodeType === BLOCKS.DOCUMENT,
  );
}

const translationApiReturnSchema = z.object({
  translations: z
    .array(
      z.object({
        text: z.string(),
      }),
    )
    .length(1),
});

const envSchema = z.object({
  TRANSLATION_REPO_DEEPL_API_URL: z.string(),
  TRANSLATION_REPO_DEEPL_API_TOKEN: z.string(),
});

async function translateHTML(
  html: string,
  target_lang: string,
): Promise<string> {
  const {
    TRANSLATION_REPO_DEEPL_API_URL: apiUrl,
    TRANSLATION_REPO_DEEPL_API_TOKEN: apiToken,
  } = envSchema.parse(process.env);

  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      text: [html],
      target_lang,
      source_lang: 'EN',
      tag_handling: 'html',
    }),
    headers: {
      Authorization: `DeepL-Auth-Key ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  const resJSON = await res.json();

  return translationApiReturnSchema.parse(resJSON).translations[0].text;
}
