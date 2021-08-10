import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
// import chicken from '../../../public/images/sprite_chicken.png';
import cow from '../../../public/images/sprite_cow.gif';
// import pig from '../../../public/images/sprite_pig.png';
// import sheep from '../../../public/images/sprite_sheep.png';

interface SpriteProps {
  animal: 'chicken' | 'cow' | 'pig' | 'sheep';
  secondsToTraverse: number; // in seconds
}

const Sprite: React.FC<SpriteProps> = ({ animal, secondsToTraverse = 5 }) => {
  const [isMovingRight, setIsMovingRight] = useState(true);
  const spriteEl = useRef(null);
  useEffect(() => {
    let startAnimation: NodeJS.Timeout;
    const animate = () => {
      startAnimation = setInterval(() => {
        setIsMovingRight(!isMovingRight);
        if (spriteEl.current !== null) {
          spriteEl.current.style.left =
            spriteEl.current.style.left == '200px'
              ? 'calc(100% - 200px)'
              : '200px';
          spriteEl.current.classList.toggle('rotate-y-180');
        }
      }, secondsToTraverse * 1000);
    };
    animate();
    return () => {
      clearInterval(startAnimation);
    };
  }, [spriteEl]);
  return (
    <div className="relative" style={{ height: `${cow.height}px` }}>
      <div
        ref={spriteEl}
        className="absolute"
        style={{
          left: '190px',
          transition: `left ${secondsToTraverse}s linear`,
        }}
      >
        <Image
          src={cow.src}
          alt={`${animal} sprite`}
          width={cow.width}
          height={cow.height}
        />
      </div>
    </div>
  );
};

export default Sprite;
