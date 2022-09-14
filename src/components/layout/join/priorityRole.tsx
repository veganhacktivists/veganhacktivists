import React from 'react';

import { DarkButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';
import getThemeColor from '../../../lib/helpers/theme';
import CustomImage from '../../decoration/customImage';

import type { StaticImageData } from 'next/image';

export interface PriorityRoleProps {
  image: StaticImageData;
  color: string;
  squareColor?: string;
  title: string;
  description: React.ReactNode;
  href: string;
}

const JobRole: React.FC<PriorityRoleProps> = ({
  image,
  color,
  squareColor = '#58a345',
  title,
  description,
  href,
}) => {
  const backgroundColor = getThemeColor(color);

  return (
    <div className="bg-gray-background text-grey-dark pb-1">
      <SquareField
        squares={[{ color: squareColor, size: 8, right: 0 }]}
        className=""
      />
      <div
        style={{ backgroundColor }}
        className="md:h-52 flex flex-col justify-center py-8"
      >
        <CustomImage alt={title} src={image} objectFit="contain" />
      </div>
      <h2 className="text-xl font-modo font-bold my-6 md:px-8">{title}</h2>
      <p className="px-10 md:px-8 text-lg text-center min-h-[100px] lg:min-h-[140px]">
        {description}
      </p>
      <div className="my-8 w-3/4 mx-auto">
        <DarkButton
          href={href}
          className="font-semibold text-lg font-mono px-16 py-4 my-4"
        >
          Apply Now
        </DarkButton>
      </div>
    </div>
  );
};

export default JobRole;
