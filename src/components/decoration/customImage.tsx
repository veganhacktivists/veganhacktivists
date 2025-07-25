/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import Image from 'next/image';

import type { ImageProps } from 'next/image';

const CustomImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      loading="eager"
      {...props}
      className={classNames(props.className, 'max-w-full h-auto inline-block')}
    />
  );
};

export default CustomImage;
