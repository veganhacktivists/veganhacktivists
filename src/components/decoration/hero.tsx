import React from 'react';
import classNames from 'classnames';

interface IHero {
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

const Hero: React.FC<IHero> = ({ imageBackground, alignment, children }) => {
  const classes = classNames('bg-center', 'bg-cover', 'bg-no-repeat', 'flex', {
    'justify-start': alignment === 'left',
    'justify-end': alignment === 'right',
  });
  const style = getStyle(imageBackground);

  return (
    <div className={classes} style={style}>
      <div className="flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default Hero;
