import classNames from 'classnames';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import Circle from './circle';

interface HeroClassNames {
  container?: string;
  content?: string;
}
interface HeroProps {
  imageBackground: ImageProps['src'];
  tagline: {
    image: StaticImageData;
    alt: string;
  };
  alignment: 'right' | 'left';
  classNameMapping?: HeroClassNames;
  main?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  imageBackground,
  tagline,
  alignment,
  children,
  classNameMapping,
  main = false,
}) => {
  const containerClasses = classNames(
    'relative',
    'p-10 md:p-32',
    'flex',
    {
      'justify-start': alignment === 'left',
      'justify-end': alignment === 'right',
      'h-screen-header-small xl:h-screen-header': main,
      'md:-top-20 md:-mb-20': main,
      'xl:h-screen-60%': !main,
    },
    classNameMapping?.container
  );
  const contentClasses = classNames(
    'flex',
    'flex-col',
    'justify-center',
    'w-1/2',
    'z-10',
    'md:px-40',
    classNameMapping?.content
  );

  return (
    <div className={containerClasses}>
      <Image
        alt=""
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        src={imageBackground as any}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
      <div className={contentClasses}>
        {tagline && (
          <div>
            <Image
              layout="intrinsic"
              src={tagline.image}
              alt={tagline.alt}
              priority
            />
          </div>
        )}
        {children}
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <Circle xAlign="right" radiusZoom={0.9} opacity={0.1} />
        <Circle yAlign="bottom" radiusZoom={1.04} />
      </div>
    </div>
  );
};

export default Hero;
