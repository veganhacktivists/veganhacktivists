/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import type { ImageProps } from 'next/image';

const CustomImage: React.FC<ImageProps> = (props) => {
  return <Image loading="eager" {...props} />;
};

export default CustomImage;
