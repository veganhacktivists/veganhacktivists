import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './scrollDownIndicator.module.scss';

interface ScrollDownIndicatorProps {
  onClick: () => void;
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="hidden md:block absolute left-1/2 right-1/2 -translate-x-1/2 text-grey-over-background cursor-pointer z-[100] bottom-10 w-10 h-24"
    >
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div className={styles.chevron} key={i}>
            <FontAwesomeIcon icon={faChevronDown} size="2x" />
          </div>
        ))}
    </div>
  );
};

export default ScrollDownIndicator;
