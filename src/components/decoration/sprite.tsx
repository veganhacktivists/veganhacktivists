import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

import Image from 'next/image';
import chicken from '../../../public/images/sprite_chicken.gif';
import pig from '../../../public/images/sprite_pig.gif';
import sheep from '../../../public/images/sprite_sheep.gif';
import cow from '../../../public/images/sprite_cow.gif';
import useWindowSize from '../../hooks/useWindowSize';
import useWindowBreakpoint from '../../hooks/useWindowBreakpoint';

interface SpriteProps {
  image: StaticImageData;
  secondsToTraverse?: number;
  scale?: number;
}

const Sprite: React.FC<SpriteProps> = ({
  image,
  secondsToTraverse = 40,
  scale = 0.5,
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
    reverse: reverse,
    onRest: () => {
      setReverse((reverse) => !reverse);
    },
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

export { cow, chicken, sheep, pig };

export default Sprite;
