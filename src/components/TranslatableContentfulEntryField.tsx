import { useState, type FC, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import Spinner from './decoration/spinner';

import { useRouterLocale } from 'lib/translation/useRouterLocale';
import { trpc } from 'lib/client/trpc';

import type { MouseEvent } from 'react';

const TranslatableContentfulEntryField: FC<{
  contentfulId: string;
  fieldId: string;
  contentType: string;
}> = ({ contentfulId, fieldId, contentType }) => {
  const intl = useIntl();
  const { defaultLocale } = useRouter();
  const currentLocale = useRouterLocale();

  const [showLocalizedHTML, setShowLocalizedHTML] = useState(false);

  const requestLocale = useMemo(
    () => (showLocalizedHTML ? currentLocale : defaultLocale!),
    [currentLocale, defaultLocale, showLocalizedHTML],
  );
  const localizedHTML = trpc.translation.getLocalizedHTML.useQuery(
    {
      contentfulId,
      fieldId,
      contentType,
      locale: requestLocale,
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: true,
    },
  );

  const toggleShowLocalizedHTML = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (localizedHTML.isFetching) {
        return;
      }
      setShowLocalizedHTML((v) => !v);
    },
    [localizedHTML.isFetching],
  );

  const buttonLabel = showLocalizedHTML
    ? intl.formatMessage({
        id: 'component.translatable-contentful-entry-field.translate-button.show-original',
        defaultMessage: 'Original',
      })
    : intl.formatMessage({
        id: 'component.translatable-contentful-entry-field.translate-button.label',
        defaultMessage: 'Translate',
      });

  return (
    <div className='relative group'>
      {currentLocale !== defaultLocale && (
        <button
          className='text-lg absolute block bottom-full opacity-30 md:opacity-50 group-hover:opacity-100 leading-[0]'
          onClick={toggleShowLocalizedHTML}
          type='button'
        >
          {localizedHTML.isFetching ? (
            <Spinner />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faLanguage}
                fixedWidth
                className={classNames('transition-all', {
                  'scale-x-[-1]': showLocalizedHTML,
                  'scale-x-1': !showLocalizedHTML,
                })}
              />{' '}
              <span className='underline'>{buttonLabel}</span>
            </>
          )}
        </button>
      )}

      {localizedHTML.data && (
        <div dangerouslySetInnerHTML={{ __html: localizedHTML.data }} />
      )}
    </div>
  );
};

export default TranslatableContentfulEntryField;
