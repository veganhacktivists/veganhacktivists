import type React from 'react';
import { FormattedMessage } from 'react-intl';

import { DarkButton } from '../../decoration/buttons';
import SquareField from '../../decoration/squares';
import getThemeColor from '../../../lib/helpers/theme';

import CustomImage from 'components/decoration/customImage';

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
      <h2 className="text-xl font-modo font-bold my-6 md:px-8">{title}</h2>
      <p className="px-10 md:px-8 text-lg text-center min-h-[140px] lg:min-h-[230px] xl:min-h-[170px]">
        {description}
      </p>
      <div className="my-8 w-3/4 mx-auto">
        <DarkButton
          href={href}
          className="font-semibold text-lg font-mono px-16 py-4 my-4"
        >
          <FormattedMessage
            id="page.join.section.open-priority-positions.cta"
            defaultMessage="Apply Now"
          />
        </DarkButton>
      </div>
    </div>
  );
};

export default JobRole;
