import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

import chicken from '../../../../public/images/sprite_chicken.gif';
import pig from '../../../../public/images/sprite_pig.gif';
import sheep from '../../../../public/images/sprite_sheep.gif';
import cow from '../../../../public/images/sprite_cow.gif';
import goat from '../../../../public/images/sprite_goat.gif';
import duck from '../../../../public/images/sprite_duck.gif';
import chicks from '../../../../public/images/sprite_chicks.gif';
import fishg from '../../../../public/images/sprite_fish_green.gif';
import fishb from '../../../../public/images/sprite_fish_blue.gif';
import useWindowSize from '../../../hooks/useWindowSize';
import useWindowBreakpoint from '../../../hooks/useWindowBreakpoint';
import CustomImage from '../customImage';
import classNames from 'classnames';
import cssAnimations from './animations.module.css';

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
        className="absolute z-20 cursor-pointer"
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
            loading="eager"
            layout="fixed"
          />
        </div>
      </animated.div>
    </>
  );
};

export { cow, chicken, sheep, pig, chicks, goat, duck, fishg, fishb };

export default Sprite;
