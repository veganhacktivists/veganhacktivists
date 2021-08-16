import type { Asset } from 'contentful';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

interface ContentfulImageProps
  extends Partial<
    Omit<ImageProps, 'src' | 'alt' | 'placeholder' | 'blurDataURL'>
  > {
  image: Asset;
  alt: string;
  ratio?: number;
}

const ContentfulImage: React.FC<ContentfulImageProps> = ({
  image,
  alt,
  ratio = 1,
  ...props
}) => {
  const { url, details } = image.fields.file;

  if (!details.image) {
    return null;
  }

  const { width, height } = details.image;
  return (
    <Image
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      src={('https:' + url) as any}
      width={width * ratio}
      height={height * ratio}
      alt={alt}
      {...props}
    />
  );
};

export default ContentfulImage;
