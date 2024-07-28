const { defaultLocale } = require('./translation/defaultLocale');

const locales = ['en', 'de' /**, 'zh', 'dev' */];

if (!locales.includes(defaultLocale)) {
  console.error('defaultLocale must be one of ' + locales.join(', '));
}

const i18nConfig = {
  locales,
  defaultLocale,

  // disable localeDetection to avoid automatic redirects until the translation feature is fully integrated
  localeDetection: false,
  serverSetCookie: 'always',
};

module.exports = i18nConfig;
