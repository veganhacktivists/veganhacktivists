import React from 'react';

import Circle from '../../decoration/circle';
import roundLogo from '../../../../public/images/VH_Logo_Crest_Tagline.png';
import VH_footer_candid_guidestar_badge from '../../../../public/images/footer/VH_footer_candid_guidestar_badge.png';
import VH_one_percent_for_the_planet_badge from '../../../../public/images/footer/VH_one_percent_for_the_planet_badge.png';
import SquareField from '../../decoration/squares';

import Social from './social';
import Links from './links';

import CustomImage from 'components/decoration/customImage';
import CustomLink from 'components/decoration/link';

const FOOTER_TOP_DECORATION_SQUARES = [
  { color: 'gray-dark', size: 16, left: 0, bottom: 0 },
];

const FOOTER_DECORATION_SQUARES = [
  { color: 'gray', size: 16, left: 0, top: 0 },
  { color: 'gray-darker', size: 16, left: 16, top: 0 },
  { color: 'gray', size: 16, right: 16, top: 0 },
];

const Logo: React.FC = () => (
  <div className='pt-10 md:pt-0'>
    <CustomImage
      src={roundLogo}
      alt='VH Round Logo'
      width={roundLogo.width * 0.4}
      height={roundLogo.height * 0.4}
    />
  </div>
);

const Badges: React.FC = () => {
  return (
    <div className='pt-10 md:pt-0 flex flex-row gap-12 w-fit md:w-auto mx-auto md:mx-0'>
      <div>
        <CustomLink href='https://www.guidestar.org/profile/92-3997981'>
          <CustomImage
            src={VH_footer_candid_guidestar_badge}
            alt='Badge: Platinum Transparency 2025 - Candid.'
            width={Math.floor(VH_footer_candid_guidestar_badge.width * 0.7)}
            height={Math.floor(VH_footer_candid_guidestar_badge.height * 0.7)}
          />
        </CustomLink>
      </div>
      <div>
        <CustomLink href='https://directories.onepercentfortheplanet.org/profile/vegan-hacktivists'>
          <CustomImage
            src={VH_one_percent_for_the_planet_badge}
            alt='Badge: one percent for the Planet'
            width={Math.floor(
              VH_one_percent_for_the_planet_badge.width * 0.275,
            )}
            height={Math.floor(
              VH_one_percent_for_the_planet_badge.height * 0.275,
            )}
          />
        </CustomLink>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <>
      <SquareField
        squares={FOOTER_TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <footer className='bg-grey-dark text-white mt-auto w-full bottom-0 left-0 flex-col md:flex-row flex gap-8 flex-wrap justify-between xl:justify-around py-24 px-12 lg:px-24 text-center z-0 relative overflow-hidden'>
        <div className='absolute top-0 left-0 right-0'>
          <SquareField
            squares={FOOTER_DECORATION_SQUARES}
            className='hidden xl:block'
          />
        </div>
        <Logo />
        <Social />
        <Links />
        <Badges />
        <div className='absolute -z-10 inset-0'>
          <Circle opacity={0.1} />
          <Circle xAlign='right' yAlign='bottom' opacity={0.1} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
