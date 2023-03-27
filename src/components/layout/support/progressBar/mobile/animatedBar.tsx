import { animated, useSpring, config } from '@react-spring/web';
import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { FormattedMessage } from 'react-intl';

import useReduceMotion from '../../../../../hooks/useReduceMotion';
import CustomImage from '../../../../decoration/customImage';
import { chicken } from '../../../../decoration/sprite';

import type { AnimatedBarProps } from '../animatedBar';

const AnimatedBar: React.FC<AnimatedBarProps> = ({ current, goal }) => {
  const [onView, setOnView] = useState<boolean>(false);

  const prefersReducedMotion = useReduceMotion();

  const { currentAmount } = useSpring({
    from: { currentAmount: 0 },
    to: { currentAmount: current },
    config: prefersReducedMotion ? { duration: 0 } : config.molasses,
    cancel: !onView,
  });
  return (
    <>
      <div className="flex flex-col-reverse absolute h-full w-[15vw]">
        <animated.div
          style={{
            height: currentAmount.to((num) => `${(num / goal) * 100}%`),
          }}
          className="relative bg-green border-green border-t-[3px]"
        >
          <div className="flex flex-col space-y-2 text-right items-end h-40 w-36 absolute top-[-3px] -right-36 z-30 border-green border-t-[3px] pl-4 bg-grey-darker">
            <div className="flex flex-row">
              <h1 className="font-mono text-4xl text-green">&#36;</h1>
              <animated.h1 className="font-mono text-4xl text-green">
                {currentAmount.to((num) => {
                  return Math.floor(num).toLocaleString('en-US');
                })}
              </animated.h1>
            </div>
            <p className="w-full text-lg text-left text-white md:text-xl">
              <FormattedMessage
                id="section.support-progess-bar.mobile.current.label"
                defaultMessage="Current monthly Patreon donations"
              />
            </p>
          </div>
          <Waypoint
            onEnter={() => {
              setOnView(true);
            }}
          />
        </animated.div>
        <div
          className="flex items-end justify-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <CustomImage
            src={chicken.src}
            height={chicken.height * 0.5}
            width={chicken.width * 0.5}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default AnimatedBar;
