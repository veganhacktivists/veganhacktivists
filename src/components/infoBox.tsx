import classNames from 'classnames';
import type { Asset } from 'contentful';
import type { StaticImageData } from 'next/image';
import React from 'react';
import getThemeColor from '../lib/helpers/theme';
import CustomImage from './decoration/customImage';

import SquareField from './decoration/squares';
import ContentfulImage from './layout/contentfulImage';

interface InfoBoxProps extends React.PropsWithChildren {
  align?: 'left' | 'right';
  icon: StaticImageData | Asset;
  iconAccentColor: string;
  iconBgColor: string;
  title: string;
  layout?: 'vertical' | 'horizontal';
}

const InfoBox: React.FC<InfoBoxProps> = ({
  align = 'left',
  children,
  icon,
  iconAccentColor,
  iconBgColor,
  title,
  layout = 'horizontal',
}) => {
  const backgroundColor = getThemeColor(iconBgColor);

  return (
    <div
      className={classNames(
        'flex w-full xl:w-3/5 mx-auto flex-row flex-wrap group',
        {
          'flex-row': layout === 'horizontal',
          'flex-row-reverse': layout === 'horizontal' && align === 'right',
          'flex-col': layout === 'vertical',
        },
        {}
      )}
    >
      <div
        style={{ backgroundColor }}
        className={'flex flex-col w-full md:max-w-xs'}
      >
        <div className="transition ease-in duration-300 opacity-0 group-hover:opacity-100">
          <SquareField
            squares={[{ color: iconAccentColor, size: 16, top: 0, right: 0 }]}
          />
        </div>
        <div className="p-10 my-auto w-full">
          {(icon as Asset).fields ? (
            <ContentfulImage image={icon as Asset} layout="responsive" alt="" />
          ) : (
            <CustomImage
              src={icon as StaticImageData}
              layout="responsive"
              alt=""
            />
          )}
        </div>
      </div>
      <div className="flex-1 py-8 px-3 md:px-10 bg-gray-background text-center md:text-left text-2xl p-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
