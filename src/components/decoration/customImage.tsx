/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import type { ImageProps } from 'next/image';

export type CustomImageProps = ImageProps;

const CustomImage = (props: ImageProps) => {
  return <Image loading="eager" {...props} />;
};

export default CustomImage;
