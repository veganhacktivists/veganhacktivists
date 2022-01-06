import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, useTrail } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import type { ImageProps } from 'next/image';
import { useCallback, useRef } from 'react';
import Circle from './circle';
import CustomImage from './customImage';

interface HeroClassNames {
  container?: string;
  content?: string;
}
interface HeroProps {
  imageBackground: ImageProps['src'];
  backgroundImageProps?: Partial<ImageProps>;
  tagline?: {
    image: StaticImageData;
    alt: string;
  };
  alignment: 'right' | 'left' | 'center';
  classNameMapping?: HeroClassNames;
  main?: boolean;
}

interface ScrollDownIndicatorProps {
  onClick: () => void;
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({
  onClick,
}) => {
  const numberOfArrows = 3;
  const opacityTrail = useTrail(numberOfArrows, {
    loop: { reverse: true },
    opacity: 0.5,
    from: { opacity: 1 },
    config: { mass: 5, tension: 2000, friction: 200 },
  });

  const spring = useSpring({
    loop: { reverse: true },
    bottom: 50,
    from: { bottom: 0 },
    config: { mass: 5, tension: 2000, friction: 200 },
  });

  return (
    <animated.div
      // style={spring} // this or bottom and animate-bounce, depending on the level of detail
      onClick={onClick}
      className="absolute left-1/2 right-1/2 -translate-x-1/2 text-grey-over-background text-5xl cursor-pointer z-10 bottom-10 animate-bounce"
    >
      {opacityTrail.map((style, i) => (
        <animated.div
          key={i}
          style={{
            ...style,
            // transform: `translateY(${i * 2})`,
          }}
          className="relative h-7 w-full overflow-visible"
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </animated.div>
      ))}
    </animated.div>
  );
};

const Hero: React.FC<HeroProps> = ({
  imageBackground,
  backgroundImageProps = {},
  tagline,
  alignment,
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
    'w-1/2',
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        src={imageBackground as any}
        layout="fill"
        objectFit="cover"
        objectPosition={main ? 'top' : 'center'}
        priority
        {...backgroundImageProps}
      />
      <h1 className={contentClasses}>
        {tagline && (
          <div
            className={classNames({
              'ml-5 md:ml-56 xl:ml-36 2xl:ml-5 py-20 md:py-20 lg:py-20': !main,
            })}
          >
            <CustomImage
              src={tagline.image}
              alt={tagline.alt}
              title={tagline.alt}
              width={
                (tagline.image.width / tagline.image.height) * taglineHeight
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
        <Circle xAlign="right" radiusZoom={0.9} opacity={0.1} />
        <Circle yAlign="bottom" radiusZoom={1.04} opacity={0.2} />
      </div>
    </div>
  );
};

export default Hero;
