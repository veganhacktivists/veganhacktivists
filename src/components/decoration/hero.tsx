import React, { useCallback, useRef } from 'react';
import classNames from 'classnames';

import Circle from './circle';
import CustomImage from './customImage';
import ScrollDownIndicator from './scrollDownIndicator';

import type { ImageProps, StaticImageData } from 'next/image';

interface HeroClassNames {
  container?: string;
  content?: string;
  tagline?: string;
}
interface HeroProps extends React.PropsWithChildren {
  imageBackground: ImageProps['src'];
  backgroundImageProps?: Partial<ImageProps>;
  tagline?: {
    image: StaticImageData;
    imageWidth?: number;
    alt: string;
    biggerOnMobile?: boolean;
  };
  alignment: 'right' | 'left' | 'center';
  imageAlignment?: 'right' | 'left' | 'center';
  classNameMapping?: HeroClassNames;
  main?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  imageBackground,
  backgroundImageProps = {},
  tagline,
  alignment,
  imageAlignment = 'center',
  children,
  classNameMapping,
  main = false,
}) => {
  const containerClasses = classNames(
    'relative',
    'flex',
    {
      'justify-start': alignment === 'left',
      'justify-end': alignment === 'right',
      'justify-center': alignment === 'center',
      'md:h-[calc(100vh-74px)] md:min-h-[40rem] md:-top-20 md:-mb-20': main,
    },
    classNameMapping?.container
  );
  const contentClasses = classNames(
    'flex',
    'flex-col',
    'justify-center',
    'md:w-1/2',
    tagline?.biggerOnMobile ? 'w-3/4' : 'w-1/2',
    'z-10',
    { 'py-10 xl:mt-0': main },
    classNameMapping?.content
  );

  const taglineHeight = 566 * 0.6;
  const ref = useRef<HTMLDivElement>(null);

  const scrollToContent = useCallback(() => {
    if (!ref.current) {
      return;
    }
    window.scrollTo({
      top: ref.current.offsetTop + ref.current.offsetHeight,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={containerClasses} ref={ref}>
      <CustomImage
        alt=""
        src={imageBackground}
        layout="fill"
        objectFit="cover"
        objectPosition={
          main
            ? 'top'
            : imageAlignment === 'left'
            ? 'left'
            : imageAlignment === 'right'
            ? 'right'
            : 'center'
        }
        priority
        {...backgroundImageProps}
      />
      <h1 className={contentClasses}>
        {tagline && (
          <div
            className={classNames(classNameMapping?.tagline, {
              'ml-5 md:ml-56 xl:ml-36 2xl:ml-5 py-20 md:py-20 lg:py-20': !main,
            })}
          >
            <CustomImage
              src={tagline.image}
              alt={tagline.alt}
              title={tagline.alt}
              width={
                ((tagline?.imageWidth ?? tagline?.image.width ?? 380) /
                  tagline.image.height) *
                taglineHeight
              }
              height={taglineHeight}
              priority
            />
          </div>
        )}
        {children}
      </h1>
      {main && <ScrollDownIndicator onClick={scrollToContent} />}
      <div className="absolute inset-0 overflow-hidden">
        <Circle xAlign="right" radius={30} opacity={0.1} />
        <Circle yAlign="bottom" radius={34} opacity={0.2} />
      </div>
    </div>
  );
};

export default Hero;
