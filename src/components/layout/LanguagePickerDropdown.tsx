import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useLocale } from 'lib/translation/useLocale';

/**
 * Locale selector positioned in the page header.
 * When focused options are exposed to the user to switch to a different locale.
 */
export const LocaleSelector = () => {
  const router = useRouter();

  const locales = router.locales;

  const languageDisplayNames = useMemo(
    () =>
      locales &&
      Object.fromEntries(
        locales.map((locale) => [
          locale,
          new Intl.DisplayNames(locale, { type: 'language' }).of(locale) ??
            locale,
        ])
      ),
    [locales]
  );

  const currentLocale = useLocale();

  const localeOptions = useMemo(
    () => locales && locales.filter((locale) => locale !== currentLocale),
    [currentLocale, locales]
  );

  if (!localeOptions || !languageDisplayNames) {
    return null;
  }

  return (
    <div>
      <div
        className="relative group text-xl h-full w-full flex flex-col items-center justify-center py-6"
        tabIndex={0}
      >
        <div className="flex flex-col items-center justify-center cursor-pointer group-focus-within:cursor-default">
          <div className="px-4 w-full h-full transition duration-300 ease-in-out opacity-0 group-focus-within:opacity-100 text-center">
            {languageDisplayNames[currentLocale]}
          </div>
          <div className="absolute top-0 px-4 w-full h-full flex items-center justify-center transition duration-300 ease-in-out opacity-100 group-focus-within:opacity-0">
            <FontAwesomeIcon icon={faLanguage} fixedWidth />
          </div>
          <div className="absolute top-full transition duration-300 ease-in-out opacity-0 group-focus-within:opacity-100">
            <div className="overflow-y-hidden h-0 group-focus-within:overflow-visible group-focus-within:h-auto flex flex-col center">
              {localeOptions.map((locale) => (
                <Link
                  key={locale + router.pathname}
                  href={router.pathname}
                  locale={locale}
                >
                  <a className="py-2 px-4 text-center bg-black">
                    {languageDisplayNames[locale]}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          {/* clone of above locale selection dropdown, positioned relatively (and outside the viewport), to respect the width of the widest element */}
          <div className="relative top-[100vh] h-0 flex flex-col center">
            {localeOptions.map((locale) => (
              <Link
                key={locale + router.pathname}
                href={router.pathname}
                locale={locale}
              >
                <a className="px-4">{languageDisplayNames[locale]}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
