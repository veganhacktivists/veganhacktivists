import classNames from 'classnames';
import React from 'react';
import styles from './ImageContainer.module.css';

const ImageContainer: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => {
  return (
    <div className={classNames(styles.imageContainer, className)} style={style}>
      {children}
    </div>
  );
};

export default ImageContainer;
