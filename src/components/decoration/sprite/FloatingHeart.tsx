import type React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import smHeart from '../../../../public/images/VH_Pixel_Heart_Small.png';
import mdHeart from '../../../../public/images/VH_Pixel_Heart_Medium.png';
import lgHeart from '../../../../public/images/VH_Pixel_Heart_Large.png';

import cssAnimations from './animations.module.css';

import CustomImage from 'components/decoration/customImage';

import type { SpringValue } from '@react-spring/web';

interface FloatingHeartProps {
  float?: boolean;
  size: 'sm' | 'md' | 'lg';
  delay?: number;
  position: SpringValue<string>;
}

const FloatingHeart: React.FC<FloatingHeartProps> = ({
  float,
  size,
  delay = 0,
  position,
}) => {
  const heartImgs = {
    sm: smHeart,
    md: mdHeart,
    lg: lgHeart,
  };
  const heartImg = heartImgs[size];
  const [floating, setFloating] = useState(false);
  const [left, setLeft] = useState(0.0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (float && !floating) {
      setFloating(true);
      setTimeout(() => {
        setLeft(Number.parseFloat(position.get()));
      }, delay);
    }
  }, [float, delay, position]);

  return (
    <div
      className={classNames(
        'absolute z-20 select-none',
        floating ? '' : 'hidden',
      )}
      style={{ left: left }}
    >
      <div
        className={classNames('relative', floating ? cssAnimations.heart : '')}
        style={{ animationDelay: `${delay}ms` }}
        onAnimationEnd={() => {
          setFloating(false);
        }}
      >
        <CustomImage
          src={heartImg.src}
          height={heartImg.height / 3}
          width={heartImg.width / 3}
          alt=""
        />
      </div>
    </div>
  );
};

export default FloatingHeart;
