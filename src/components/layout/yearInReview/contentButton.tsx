import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import CustomImage from '../../decoration/customImage';
import ContentfulImage from '../contentfulImage';
import getThemeColor from '../../../lib/helpers/theme';

import type { Asset } from 'contentful';
import type { StaticImageData } from 'next/image';

export interface ContentButtonProps {
  content: { title: string; image: Asset | StaticImageData };
  setContent: () => void;
  active: boolean;
  down?: boolean;
  white?: boolean;
}

const isContentfulImage = (asset: Asset | StaticImageData): asset is Asset => {
  return 'fields' in asset;
};

export const ContentButton: React.FC<ContentButtonProps> = ({
  content,
  down = false,
  white = false,
  active,
  setContent,
}) => {
  const backgroundColor = getThemeColor(
    active ? 'grey-dark' : white ? 'white' : 'grey-background'
  );

  const borderColor = getThemeColor(
    active ? 'grey-dark' : !white ? 'white' : 'grey-background'
  );

  return (
    <div
      className={classNames(
        'flex justify-center items-center h-12 w-80 mx-auto relative mb-[4px]',
        down ? '-bottom-80' : 'bottom-0'
      )}
      style={{
        transition: 'bottom 700ms ease 0s',
        backgroundColor,
      }}
      onClick={() => {
        if (!active) {
          setContent();
        }
      }}
    >
      <div className="cursor-pointer select-none">
        <div
          className={`text-2xl font-semibold font-mono text-${
            active ? 'white' : 'black'
          }`}
        >
          {content.title}
        </div>
        <div
          className={
            'flex justify-center items-center absolute bottom-0 right-0 h-12 w-12'
          }
        >
          <FontAwesomeIcon
            size="lg"
            icon={faChevronDown}
            color={active ? 'white' : 'black'}
            className={`transition-transform duration-700 ${
              active ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
      <div
        className="absolute -bottom-80 w-80 h-80 border-t-4"
        style={{ borderColor }}
      >
        {isContentfulImage(content.image) ? (
          <ContentfulImage
            image={content.image}
            alt={content.title + ' logo'}
            layout="fill"
          />
        ) : (
          <CustomImage src={content.image} alt={content.title + ' logo'} />
        )}
      </div>
    </div>
  );
};
