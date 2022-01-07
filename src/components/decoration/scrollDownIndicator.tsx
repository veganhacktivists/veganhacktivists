import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface ScrollDownIndicatorProps {
  onClick: () => void;
}

const StyledChevron = styled.div`
  position: absolute;
  width: calc(0.6rem * 3.5);
  height: calc(0.6rem * 0.8);
  opacity: 0;
  transform: scale(0.3);
  animation: move-chevron 3s ease-out infinite;

  :first-child {
    animation: move-chevron 3s ease-out 1s infinite;
  }

  :nth-child(2) {
    animation: move-chevron 3s ease-out 2s infinite;
  }

  @keyframes move-chevron {
    25% {
      opacity: 1;
    }
    33.3% {
      opacity: 1;
      transform: translateY(calc(0.6rem * 3.8));
    }
    66.6% {
      opacity: 1;
      transform: translateY(calc(0.6rem * 5.2));
    }
    100% {
      opacity: 0;
      transform: translateY(calc(0.6rem * 8)) scale(0.5);
    }
  }
`;

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
          <StyledChevron key={i}>
            <FontAwesomeIcon icon={faChevronDown} size="2x" />
          </StyledChevron>
        ))}
    </div>
  );
};

export default ScrollDownIndicator;
