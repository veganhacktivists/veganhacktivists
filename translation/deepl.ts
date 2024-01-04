import axios from 'axios';
import { z } from 'zod';

getEnv();

function getEnv(): [apiUrl: string, apiToken: string] {
  const apiUrl = process.env.TRANSLATION_REPO_DEEPL_API_URL;
  const apiToken = process.env.TRANSLATION_REPO_DEEPL_API_TOKEN;

  if (!apiUrl) {
    throw new Error('DEEPL api url is missing');
  }

  if (!apiToken) {
    throw new Error('DEEPL api token is missing');
  }

  return [apiUrl, apiToken];
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

export async function translate(
  text: string,
  target_lang: string,
): Promise<string> {
  const [apiUrl, apiToken] = getEnv();

  const res = await axios({
    method: 'POST',
    url: `${apiUrl}?${new URLSearchParams({
      text,
      target_lang,
      source_lang: 'EN',
      tag_handling: 'xml',
      outline_detection: '0',
      ignore_tags: 'no-localization',
    }).toString()}`,
    headers: {
      Authorization: `DeepL-Auth-Key ${apiToken}`,
    },
    responseType: 'json',
  });

  return translationApiReturnSchema.parse(res.data).translations[0].text;
}
