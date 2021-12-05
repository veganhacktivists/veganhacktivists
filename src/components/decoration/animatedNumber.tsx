import { useSpring, animated } from '@react-spring/web';
import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import useReduceMotion from '../../hooks/useReduceMotion';

const AnimatedNumber: React.FC<{ number: number; approx?: boolean }> = ({
  number,
  approx = false,
}) => {
  const [onView, setOnView] = useState<boolean>(false);

  const prefersReducedMotion = useReduceMotion();

  const { number: interpolatedNumber } = useSpring({
    from: { number: 0 },
    to: { number },
    config: { duration: prefersReducedMotion ? 0 : 500 },
    cancel: !onView,
  });

  return (
    <>
      <Waypoint
        onEnter={() => {
          setOnView(true);
        }}
      />
      <span className="text-7xl xl:text-8xl" aria-label={`${number}`}>
        <animated.span>
          {interpolatedNumber.to((x) =>
            Math.floor(x)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          )}
        </animated.span>
        {approx && <>~</>}
      </span>
    </>
  );
};

export default AnimatedNumber;
