'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { defaultLocale } from '../../../i18nConfig';

import Spinner from 'components/decoration/spinner';
import { useDynamicTranslationStore } from 'lib/stores/dynamicTranslationStore';
import { useRouterLocale } from 'lib/translation/useRouterLocale';

const LocalizedContentfulPageToggleButton = ({
  className,
}: {
  className?: string;
}) => {
  const intl = useIntl();
  const { showLocalizedContent, setShowLocalizedContent, loadingChildren } =
    useDynamicTranslationStore();

  const currentLocale = useRouterLocale();
  const enabled = currentLocale !== defaultLocale;

  const buttonLabel = showLocalizedContent
    ? intl.formatMessage({
        id: 'component.translatable-contentful-entry-field.translate-button.show-original',
        defaultMessage: 'Show original page',
      })
    : intl.formatMessage({
        id: 'component.translatable-contentful-entry-field.translate-button.label',
        defaultMessage: 'Automatic page translation',
      });

  const isLoading = useMemo(
    () =>
      Object.entries(loadingChildren).filter(([, loading]) => loading).length >
      0,
    [loadingChildren],
  );

  const toggleShowLocalizedContent = () =>
    setShowLocalizedContent((show) => !show);

  return (
    <div className={className}>
      <button
        className={classNames('text-lg w-fit', { invisible: !enabled })}
        disabled={!enabled}
        onClick={toggleShowLocalizedContent}
        type='button'
      >
        <span>
          <FontAwesomeIcon icon={faLanguage} fixedWidth />{' '}
          <span className='underline'>{buttonLabel}</span>
        </span>

        {isLoading && <Spinner />}
      </button>
    </div>
  );
};

export default LocalizedContentfulPageToggleButton;
