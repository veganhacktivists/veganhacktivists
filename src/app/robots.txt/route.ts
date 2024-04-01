import HttpCodes from 'http-status-codes';

import i18nConfig from '../../../i18nConfig.js';

import type { NextApiHandler } from 'next';

const GET: NextApiHandler = function () {
  return new Response(
    `# http://www.robotstxt.org/robotstxt.html

User-agent: *

# ignore translated pages for now
${i18nConfig.locales
  .filter((locale) => locale !== i18nConfig.defaultLocale)
  .map((locale) => `Disallow: /${locale}/*`)
  .join('\n')}
`,
    { status: HttpCodes.OK },
  );
};

export { GET };
