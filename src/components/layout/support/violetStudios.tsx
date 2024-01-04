import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import VSLogoLottieFile from '../../../../public/lottiefiles/VS_logoAnim_Minimal.json';

import { LightButton } from 'components/decoration/buttons';

const VioletStudios: React.FC = () => {
  return (
    <div className='bg-black px-4 md:px-0'>
      <div className='py-36 w-full 2xl:w-3/4 md:pl-10 m-auto flex flex-col-reverse md:flex-row text-white text-left gap-16 max-w-7xl'>
        <div className='basis-[calc(50%-1rem)] lg:basis-1/2'>
          <h2 className='text-4xl font-bold mb-4'>Support Two Orgs At Once</h2>
          <div className='text-lg'>
            Your generous donation also supports Violet Studios, our sister
            organization. Vegan Hacktivists and Violet Studios collaborate
            closely on tech and design projects. Both organizations are
            committed to advancing the animal protection movement by providing
            pro-bono capacity building services of the highest quality. Thank
            you!
          </div>
          <LightButton
            capitalize={false}
            className='mt-12 text-center w-full md:w-fit'
            href='https://violetstudios.org/'
            newTab
          >
            Visit violetstudios.org
          </LightButton>
        </div>
        <div className='basis-[calc(50%-1rem)] lg:basis-1/2 flex items-center justify-center'>
          <Player
            autoplay
            loop
            src={VSLogoLottieFile}
            className='w-3/5 md:w-[290px]'
          />
        </div>
      </div>
    </div>
  );
};

export default VioletStudios;
