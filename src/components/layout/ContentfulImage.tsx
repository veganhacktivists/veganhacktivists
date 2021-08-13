import type { Asset } from 'contentful';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

interface ContentfulImageProps extends Partial<ImageProps> {
  image: Asset;
  alt: string;
}

const ContentfulImage: React.FC<ContentfulImageProps> = ({
  image,
  alt,
  ...props
}) => {
  const { url, details } = image.fields.file;

  if (!details.image) {
    return null;
  }

  const { width, height } = details.image;
  return (
    <Image
      src={'https:' + url}
      width={width}
      height={height}
      alt={alt}
      {...props}
    />
  );
};

export default ContentfulImage;
