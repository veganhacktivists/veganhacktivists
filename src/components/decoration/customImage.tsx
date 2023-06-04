/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/legacy/image';

import type { ImageProps } from 'next/legacy/image';

export type CustomImageProps = ImageProps;

const CustomImage = (props: CustomImageProps) => {
  return <Image loading="eager" {...props} />;
};

export default CustomImage;
