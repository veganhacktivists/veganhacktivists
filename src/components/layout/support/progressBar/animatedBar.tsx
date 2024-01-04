import { animated, useSpring, config } from '@react-spring/web';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Waypoint } from 'react-waypoint';

import useReduceMotion from '../../../../hooks/useReduceMotion';
import { chicken } from '../../../decoration/sprite';

import CustomImage from 'components/decoration/customImage';

export interface AnimatedBarProps {
  current: number;
  goal: number;
}

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
      <div className='flex flex-row'>
        <animated.div
          style={{ width: currentAmount.to((num) => `${(num / goal) * 100}%`) }}
          className='h-24 relative bg-green border-green border-r-[3px] box-border'
        >
          <div className='flex flex-col space-y-2 justify-end h-40 w-48 absolute -bottom-40 -right-48 border-green border-l-[3px] pl-4'>
            <div className='flex flex-row'>
              <h1 className='font-mono text-5xl text-green'>&#36;</h1>
              <animated.h1 className='font-mono text-5xl text-green'>
                {currentAmount.to((num) => {
                  return Math.floor(num).toLocaleString('en-US');
                })}
              </animated.h1>
            </div>
            <p className='w-full text-lg text-left text-white md:text-xl'>
              <FormattedMessage
                id='section.support-progess-bar.current.label'
                defaultMessage='Current monthly donations'
              />
            </p>
          </div>
        </animated.div>
        <div
          className='flex items-end'
          style={{ transform: 'rotateY(180deg)' }}
        >
          <CustomImage
            src={chicken.src}
            height={chicken.height * 0.5}
            width={chicken.width * 0.5}
            alt=''
          />
        </div>
      </div>
      <Waypoint
        onEnter={() => {
          setOnView(true);
        }}
      />
    </>
  );
};

export default AnimatedBar;
