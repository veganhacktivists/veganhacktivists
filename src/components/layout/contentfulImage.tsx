import CustomImage from '../decoration/customImage';

import type { Asset } from 'contentful';
import type { ImageProps } from 'next/image';

interface ContentfulImageProps
  extends Partial<Omit<ImageProps, 'src' | 'alt'>> {
  image: Asset;
  alt: string;
  ratio?: number;
  downloadWidth?: number;
  thumbnail?: boolean;
}

const ContentfulImage: React.FC<ContentfulImageProps> = ({
  image,
  alt,
  downloadWidth,
  thumbnail = false,
  ...props
}) => {
  const { url, details } = image.fields.file;

  if (!details.image) {
    return null;
  }

  const { width, height } = details.image;

  const sizeProps =
    props.layout !== 'fill' || !props.layout ? { width, height } : {};

  return (
    <CustomImage
      loader={
        downloadWidth === undefined
          ? downloadWidth
          : ({ src, quality = 75 }) => `${src}?w=${downloadWidth}&q=${quality}`
      }
      src={`https:${url}`}
      alt={alt}
      {...sizeProps}
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      srl_gallery_image={thumbnail ? 'true' : undefined}
    />
  );
};

export default ContentfulImage;
