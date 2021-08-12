import type { Asset } from 'contentful';
import Image from 'next/image';

interface ContentfulImageProps {
  image: Asset;
  alt: string;
}

const ContentfulImage: React.FC<ContentfulImageProps> = ({ image, alt }) => {
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
      layout="responsive"
    />
  );
};

export default ContentfulImage;
