import getThemeColor from '../../../lib/helpers/theme';
import { LightButton } from '../../decoration/buttons';

import CustomImage from 'components/decoration/customImage';

import type { StaticImageData } from 'next/image';

interface DonationCardProps extends React.PropsWithChildren {
  title: string;
  buttonText: string;
  buttonHref: string;
  color: string;
  image: StaticImageData;
  large?: boolean;
}

const DonationCard: React.FC<DonationCardProps> = ({
  title,
  buttonText,
  buttonHref,
  image,
  color,
  large,
  children,
}) => {
  const backgroundColor = getThemeColor(color);

  return (
    <div
      style={{
        width: `${large ? '400px' : '300px'}`,
        height: `${large ? '540px' : '400px'}`,
      }}
      className='flex-col bg-gray-lighter'
    >
      <div style={{ backgroundColor }}>
        <div className={'absolute w-8 h-8 transparent'} />
        <div className='p-12'>
          <CustomImage
            src={image.src}
            width={image.width / 3}
            height={image.height / 3}
            alt='Our community'
          />
        </div>
      </div>
      <div className='p-8'>
        <h1 className='pb-5 font-mono text-3xl font-bold'>{title}</h1>
        <p className='mx-auto mb-8 text-xl'>{children}</p>
        <LightButton href={buttonHref}>{buttonText}</LightButton>
      </div>
    </div>
  );
};

export default DonationCard;
