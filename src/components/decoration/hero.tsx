import React from 'react';
import classNames from 'classnames';

interface HeroProps {
  imageBackground: string | StaticImageData;
  alignment: 'right' | 'left';
}

const getStyle = (imageBackground: string | StaticImageData) =>
  typeof imageBackground === 'string'
    ? { backgroundImage: `url("${imageBackground}")` }
    : {
        backgroundImage: `url("${imageBackground.src}")`,
        width: `${imageBackground.width}px`,
        height: `${imageBackground.height}px`,
      };

const Hero: React.FC<HeroProps> = ({
  imageBackground,
  alignment,
  children,
}) => {
  const containerClasses = classNames(
    'relative',
    'lg:-top-20 lg:-mb-20',
    'p-10 md:p-32',
    'bg-scroll md:bg-fixed',
    'bg-cover',
    'bg-no-repeat',
    'flex',
    {
      'justify-start': alignment === 'left',
      'justify-end': alignment === 'right',
    }
  );
  const contentClasses = classNames(
    'flex',
    'flex-col',
    'justify-center',
    'w-1/2'
  );

  const style = getStyle(imageBackground);

  return (
    <div className={containerClasses} style={style}>
      <div className={contentClasses}>{children}</div>
    </div>
  );
};

export default Hero;
