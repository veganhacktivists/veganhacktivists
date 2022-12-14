import Script from 'next/script';
import React from 'react';

import getThemeColor from '../../../lib/helpers/theme';
import CustomImage from '../../decoration/customImage';

import type { StaticImageData } from 'next/image';

interface DonorCardProps extends React.PropsWithChildren {
  color: string;
  image?: StaticImageData;
  large?: boolean;
}

interface DonorBoxIframeProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  allowpaymentrequest: string;
}
const DonorBoxIframe: React.FC<DonorBoxIframeProps> = ({ ...props }) => {
  return <iframe {...props} />;
};

const DonorBoxCard: React.FC<DonorCardProps> = ({ image, color, large }) => {
  const backgroundColor = getThemeColor(color);
  const scriptProps = { paypalExpress: 'false' };

  return (
    <div
      style={{
        width: `${large ? '400px' : '300px'}`,
      }}
      className="flex flex-col bg-white"
    >
      {image && (
        <div style={{ backgroundColor }}>
          <div className={'absolute w-8 h-8 transparent'} />
          <div className="p-12">
            <CustomImage
              src={image.src}
              width={image.width / 3}
              height={image.height / 3}
              alt="Patreon"
            />
          </div>
        </div>
      )}
      <div className="flex flex-grow">
        <Script src="https://donorbox.org/widget.js" {...scriptProps} />
        <DonorBoxIframe
          src="https://donorbox.org/embed/veganhacktivists"
          className={'min-h-[555px]'}
          name="donorbox"
          scrolling={'no'}
          allowpaymentrequest="allowpaymentrequest"
          seamless={true}
          width="100%"
        />
      </div>
    </div>
  );
};

export default DonorBoxCard;
