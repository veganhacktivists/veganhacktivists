import React from 'react';
import { LightButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';
import getThemeColor from '../../../lib/helpers/theme';
import CustomImage from '../../decoration/customImage';
import type { StaticImageData } from 'next/image';

export interface JobRoleProps {
  image: StaticImageData;
  color: string;
  squareColor?: string;
  title: string;
  description: React.ReactNode;
  href: string;
}

const JobRole: React.FC<JobRoleProps> = ({
  image,
  color,
  squareColor = '#58a345',
  title,
  description,
  href,
}) => {
  const backgroundColor = getThemeColor(color);

  return (
    <div className="bg-gray-background text-grey-dark">
      <SquareField
        squares={[{ color: squareColor, size: 16, right: 0 }]}
        className=""
      />
      <div
        style={{ backgroundColor }}
        className="md:h-52 flex flex-col justify-center py-8"
      >
        <CustomImage alt={title} src={image} objectFit="contain" />
      </div>
      <h2 className="text-4xl font-modo font-bold my-8 md:px-8">{title}</h2>
      <p className="px-10 md:px-8 text-2xl text-center">{description}</p>
      <div className="my-8 w-2/3 mx-auto">
        <LightButton
          href={href}
          className="font-semibold font-mono px-16 py-2 my-4"
        >
          Apply Now
        </LightButton>
      </div>
    </div>
  );
};

export default JobRole;
