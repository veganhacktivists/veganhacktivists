import type { Asset } from 'contentful';
import type { ImageProps } from 'next/image';
import CustomImage from '../decoration/customImage';

interface ContentfulImageProps
  extends Partial<Omit<ImageProps, 'src' | 'alt'>> {
  image: Asset;
  alt: string;
  ratio?: number;
  downloadWidth?: number;
}

const ContentfulImage: React.FC<ContentfulImageProps> = ({
  image,
  alt,
  downloadWidth,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      src={('https:' + url) as any}
      alt={alt}
      {...sizeProps}
      {...props}
    />
  );
};

export default ContentfulImage;
