import React from 'react';

import { LightButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';
import getThemeColor from '../../../lib/helpers/theme';

import CustomImage from 'components/decoration/customImage';

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
      <div style={{ backgroundColor }}>
        <SquareField
          squares={[{ color: squareColor, size: 16, right: 0 }]}
          className=""
        />
        <div className="md:h-52 flex flex-col justify-center py-8 relative z-20">
          <CustomImage
            alt={title}
            src={image}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
      <h2 className="text-4xl font-modo font-bold my-8 px-5">{title}</h2>
      <p className="px-5 text-2xl text-center">{description}</p>
      <div className="my-8 w-2/3 mx-auto">
        <LightButton
          href={href}
          className="font-semibold font-mono px-8 py-2 my-4"
        >
          Apply Now
        </LightButton>
      </div>
    </div>
  );
};

export default JobRole;
