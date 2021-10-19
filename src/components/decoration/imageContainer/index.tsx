import classNames from 'classnames';
import React from 'react';

const ImageContainer: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => {
  return (
    <div className={classNames('image-container', className)} style={style}>
      {children}
    </div>
  );
};

export default ImageContainer;
