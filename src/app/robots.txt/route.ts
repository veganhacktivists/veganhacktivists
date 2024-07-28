import HttpCodes from 'http-status-codes';

import i18nConfig from '../../../i18nConfig.js';

export const dynamic = 'force-static';

export function GET() {
  return new Response(
    `# http://www.robotstxt.org/robotstxt.html

User-agent: *

# ignore pages with locale prefix for now
${i18nConfig.locales.map((locale) => `Disallow: /${locale}/*`).join('\n')}
`,
    { status: HttpCodes.OK },
  );
}
