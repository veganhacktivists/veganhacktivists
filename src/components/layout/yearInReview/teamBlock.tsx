import React from 'react';

import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';

import type { StaticImageData } from 'next/image';

interface TeamBlockProps extends React.PropsWithChildren {
  team: string;
  color: string;
  image: StaticImageData;
}
const TeamBlock: React.FC<TeamBlockProps> = ({
  team,
  color,
  image,
  children,
}) => {
  return (
    <div className='flex flex-col md:flex-row gap-5 md:gap-10 mb-10'>
      <div className='flex justify-center'>
        <div className='bg-grey h-[175px] w-[175px]'>
          <SquareField
            squares={[
              {
                color,
                top: 0,
                left: 0,
                size: 6,
              },
            ]}
          />
          <CustomImage width={175} height={175} src={image} alt={team} />
        </div>
      </div>
      <div className='text-white text-center md:text-left'>
        <h2 className='text-4xl font-bold pb-2'>{team}</h2>
        <div className='text-lg'>{children}</div>
      </div>
    </div>
  );
};

export default TeamBlock;
