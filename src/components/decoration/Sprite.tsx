import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

import Image from 'next/image';
import chicken from '../../../public/images/sprite_chicken.gif';
import pig from '../../../public/images/sprite_pig.gif';
import sheep from '../../../public/images/sprite_sheep.gif';
import cow from '../../../public/images/sprite_cow.gif';
import useWindowSize from '../../hooks/useWindowSize';

interface SpriteProps {
  image: StaticImageData;
  secondsToTraverse?: number;
}

const Sprite: React.FC<SpriteProps> = ({ image, secondsToTraverse = 10 }) => {
  const spriteRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowSize();
  const initialPosition = '200px';
  const spring = useSpring({
    from: {
      left: initialPosition,
    },
    to: {
      left: `${Math.max((width || 0) - 300, 0)}px`,
    },
    loop: { reverse: true },
    onRest: ({ value }) => {
      if (spriteRef.current === null) {
        return;
      }
      const arrivedLeftSide = value.left === initialPosition;

      spriteRef.current.classList.toggle('rotate-y-180', arrivedLeftSide);
    },
    config: { duration: secondsToTraverse * 1000 },
  });

  const ratio = 1;

  return (
    <animated.div
      ref={spriteRef}
      className="none md:absolute rotate-y-180"
      style={{ ...spring, height: `${image.height}px` }}
    >
      <Image
        src={image}
        height={image.height * ratio}
        width={image.width * ratio}
        alt=""
      />
    </animated.div>
  );
};

export { cow, chicken, sheep, pig };

export default Sprite;
