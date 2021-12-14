import type { Asset } from 'contentful';
import type { ImageProps } from 'next/image';
import CustomImage from '../decoration/customImage';

interface ContentfulImageProps
  extends Partial<Omit<ImageProps, 'src' | 'alt'>> {
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

  const sizeProps =
    props.layout === 'fixed' || !props.layout
      ? { width: width * ratio, height: height * ratio }
      : {};

  return (
    <CustomImage
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      src={('https:' + url) as any}
      width={width * ratio}
      height={height * ratio}
      alt={alt}
      // {...sizeProps}
      {...props}
    />
  );
};

export default ContentfulImage;
