import React, { useState, useEffect } from 'react';
import { useSpring, animated, useSprings } from '@react-spring/web';

import Image from 'next/image';
import chicken from '../../../public/images/sprite_chicken.gif';
import pig from '../../../public/images/sprite_pig.gif';
import sheep from '../../../public/images/sprite_sheep.gif';
import cow from '../../../public/images/sprite_cow.gif';
import goat from '../../../public/images/sprite_goat.gif';
import duck from '../../../public/images/sprite_duck.gif';
import chicks from '../../../public/images/sprite_chicks.gif';
import fishg from '../../../public/images/sprite_fish_green.gif';
import fishb from '../../../public/images/sprite_fish_blue.gif';
import useWindowSize from '../../hooks/useWindowSize';
import useWindowBreakpoint from '../../hooks/useWindowBreakpoint';

interface DelayedSpriteProps {
  image: StaticImageData;
  secondsToTraverse: number;
  scale: number;
  delay: number;
}

const DelayedSprite: React.FC<DelayedSpriteProps> = ({
  image,
  secondsToTraverse,
  scale,
  delay,
}) => {
  const [reverse, setReverse] = useState<boolean>(false);

  const mdSize = useWindowBreakpoint('md');

  const { width = mdSize + 1 } = useWindowSize();

  const isMdScreen = width <= mdSize;

  const pixelSize = 64;

  const initialPositionPx = isMdScreen ? 0 : 3 * pixelSize;
  const finalPositionPx = isMdScreen
    ? width - image.width * scale
    : width - pixelSize - 20 - image.width * scale;
  const initialPosition = `${initialPositionPx}px`;
  const finalPosition = `${finalPositionPx}px`;

  const spring = useSpring({
    from: {
      left: initialPosition,
    },
    to: {
      left: finalPosition,
    },
    reverse,
    onRest: () => {
      setReverse((reverse) => !reverse);
    },
    delay,
    config: {
      duration: secondsToTraverse * 1000 * (width / 1920),
    },
  });

  return (
    <animated.div
      className="absolute z-20"
      style={{
        ...spring,
        height: image.height * scale,
        translateY: -image.height * scale,
        rotateY: reverse ? undefined : 180,
      }}
    >
      <Image
        src={image}
        height={image.height * scale}
        width={image.width * scale}
        alt=""
        loading="eager"
        layout="fixed"
      />
    </animated.div>
  );
};

interface SpriteProps {
  image: StaticImageData;
  secondsToTraverse?: number;
  scale?: number;
  repeat?: number;
  delay?: number;
}

const Sprite: React.FC<SpriteProps> = ({
  image,
  secondsToTraverse = 40,
  scale = 0.5,
  repeat = 1,
  delay = 4000,
}) => {
  return (
    <>
      {[...Array(repeat)].map((_, i) => {
        return (
          <DelayedSprite
            key={i}
            secondsToTraverse={secondsToTraverse}
            image={image}
            scale={scale}
            delay={i * delay}
          />
        );
      })}
    </>
  );
};

export { cow, chicken, sheep, pig, chicks, goat, duck, fishg, fishb };

export default Sprite;
