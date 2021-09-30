import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import useThemeColor from '../../../hooks/useThemeColor';
import CustomImage from '../../decoration/customImage';
import ImageContainer from '../../decoration/imageContainer';

export interface ContentButtonProps {
  contentTitle: string;
  setContent: (content: string) => void;
  currentContent: string;
  down?: boolean;
  white?: boolean;
}

export const ContentButton: React.FC<ContentButtonProps> = ({
  contentTitle,
  down = false,
  white = false,
  currentContent,
  setContent,
}) => {
  const contentName = contentTitle.replace(/\s+/g, '').toLowerCase();
  const active = currentContent === contentName;

  const backgroundColor = useThemeColor(
    active ? 'grey-dark' : white ? 'white' : 'grey-background'
  );

  return (
    <div
      className={classNames(
        'flex justify-center items-center h-12 w-80 mx-auto relative',
        down ? '-bottom-80' : 'bottom-0'
      )}
      style={{
        transition: 'bottom 700ms ease 0s',
        backgroundColor,
      }}
      onClick={() => {
        if (!active) {
          setContent(contentName);
        }
      }}
    >
      <div className="cursor-pointer select-none">
        <p
          className={`text-2xl font-semibold font-mono text-${
            active ? 'white' : 'black'
          }`}
        >
          {contentTitle}
        </p>
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

      <ImageContainer className="absolute -bottom-80 w-80 h-80">
        <CustomImage
          src={`/images/review2020/${contentName}.webp`}
          alt={contentName + ' logo'}
          layout="fill"
        />
      </ImageContainer>
    </div>
  );
};