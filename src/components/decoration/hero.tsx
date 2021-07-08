import React from 'react';

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
  const alignmentClass =
    alignment === 'right' ? 'justify-end' : 'justify-start';
  const style = getStyle(imageBackground);

  return (
    <div
      className={`bg-center bg-cover bg-no-repeat flex ${alignmentClass} content-center`}
      style={style}
    >
      <div className="flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default Hero;
