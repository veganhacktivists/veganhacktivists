'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { defaultLocale } from '../../../translation/defaultLocale';

import { useDynamicTranslationStore } from 'lib/stores/dynamicTranslationStore';
import { useAppRouterLocale } from 'lib/translation/useAppRouterLocale';

const LocalizedContentfulPageToggleButton = ({
  className,
}: {
  className?: string;
}) => {
  const intl = useIntl();
  const { showLocalizedContent, setShowLocalizedContent } =
    useDynamicTranslationStore();

  const currentLocale = useAppRouterLocale();
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
      </button>
    </div>
  );
};

export default LocalizedContentfulPageToggleButton;
