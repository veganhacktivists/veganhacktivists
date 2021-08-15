import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

import Image from 'next/image';
import chicken from '../../../public/images/sprite_chicken.gif';
import pig from '../../../public/images/sprite_pig.gif';
import sheep from '../../../public/images/sprite_sheep.gif';
import cow from '../../../public/images/sprite_cow.gif';

interface SpriteProps {
  image: StaticImageData;
  secondsToTraverse?: number;
  scale?: number;
}

const Sprite: React.FC<SpriteProps> = ({
  image,
  secondsToTraverse = 10,
  scale = 0.5,
}) => {
  const [reverse, setReverse] = useState<boolean>(false);

  const initialPosition = '15vw';
  const spring = useSpring({
    from: {
      left: initialPosition,
    },
    to: {
      left: '85vw',
    },
    reverse: reverse,
    onRest: () => {
      setReverse((reverse) => !reverse);
    },
    config: { duration: secondsToTraverse * 1000 },
  });

  return (
    <animated.div
      className="none md:absolute"
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
      />
    </animated.div>
  );
};

export { cow, chicken, sheep, pig };

export default Sprite;
