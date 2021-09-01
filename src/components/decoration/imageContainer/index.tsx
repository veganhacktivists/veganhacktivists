import classNames from 'classnames';
import styles from './ImageContainer.module.css';

const ImageContainer: React.FC<{ className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={classNames(styles.imageContainer, className)}>
      {children}
    </div>
  );
};

export default ImageContainer;
