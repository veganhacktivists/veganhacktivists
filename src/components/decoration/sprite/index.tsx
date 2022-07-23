import { useSpring, animated } from '@react-spring/web';
import React, { useState } from 'react';
import classNames from 'classnames';

import chicken from '../../../../public/images/animated/sprite_chicken.gif';
import pig from '../../../../public/images/animated/sprite_pig.gif';
import sheep from '../../../../public/images/animated/sprite_sheep.gif';
import cow from '../../../../public/images/animated/sprite_cow.gif';
import goat from '../../../../public/images/animated/sprite_goat.gif';
import duck from '../../../../public/images/animated/sprite_duck.gif';
import chicks from '../../../../public/images/animated/sprite_chicks.gif';
import fishg from '../../../../public/images/animated/sprite_fish_green.gif';
import fishb from '../../../../public/images/animated/sprite_fish_blue.gif';
import useWindowSize from '../../../hooks/useWindowSize';
import useWindowBreakpoint from '../../../hooks/useWindowBreakpoint';
import CustomImage from '../customImage';

import FloatingHeart from './FloatingHeart';
import cssAnimations from './animations.module.css';

import type { StaticImageData } from 'next/image';

interface SpriteProps {
  image: StaticImageData;
  secondsToTraverse?: number;
  scale?: number;
  pixelsLeft?: number;
  pixelsRight?: number;
}

const pixelSize = 64;

const Sprite: React.FC<SpriteProps> = ({
  image,
  secondsToTraverse = 40,
  scale = 0.5,
  pixelsLeft = 3,
  pixelsRight = 1,
}) => {
  const [reverse, setReverse] = useState<boolean>(false);
  const [jumping, setJumping] = useState<boolean>(false);

  const mdSize = useWindowBreakpoint('md');

  const { width = mdSize + 1 } = useWindowSize();

  const isMdScreen = width <= mdSize;

  const initialPositionPx = isMdScreen ? 0 : pixelsLeft * pixelSize;
  const finalPositionPx = isMdScreen
    ? width - image.width * scale
    : width - pixelsRight * pixelSize - 20 - image.width * scale;
  const initialPosition = `${initialPositionPx}px`;
  const finalPosition = `${finalPositionPx}px`;

  const spring = useSpring({
    from: {
      left: initialPosition,
    },
    to: {
      left: finalPosition,
    },
    reverse: reverse,
    onRest: () => {
      setReverse((reverse) => !reverse);
    },
    config: {
      duration: secondsToTraverse * 1000 * (width / 1920),
    },
  });

  return (
    <>
      <animated.div
        className="absolute z-20 cursor-pointer select-none"
        style={{
          ...spring,
          height: image.height * scale,
          translateY: -image.height * scale,
          rotateY: reverse ? undefined : 180,
        }}
        onClick={() => {
          setJumping(true);
        }}
      >
        <div
          className={classNames(
            'relative',
            jumping ? cssAnimations.sprite : ''
          )}
          onAnimationEnd={() => {
            setJumping(false);
          }}
        >
          <CustomImage
            src={image}
            height={image.height * scale}
            width={image.width * scale}
            alt=""
            layout="fixed"
          />
        </div>
      </animated.div>
      <FloatingHeart position={spring.left} size="md" float={jumping} />
      <FloatingHeart
        position={spring.left}
        size="lg"
        float={jumping}
        delay={300}
      />
      <FloatingHeart
        position={spring.left}
        size="md"
        float={jumping}
        delay={600}
      />
    </>
  );
};

export { cow, chicken, sheep, pig, chicks, goat, duck, fishg, fishb };

export default Sprite;
