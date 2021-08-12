import Image from 'next/image';

interface FeaturedProjectProps {
  href: string;
  image: StaticImageData;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ href, image }) => {
  return (
    <div>
      <a href={href} target="_blank" rel="noreferrer">
        <Image
          className="rounded-2xl"
          src={image}
          // width={image.width}
          // height={image.height}
          alt={href}
        />
      </a>
    </div>
  );
};

export default FeaturedProject;
