import styles from './ImageContainer.module.css';

const ImageContainer: React.FC = ({ children }) => {
  return <div className={styles.imageContainer}>{children}</div>;
};

export default ImageContainer;
