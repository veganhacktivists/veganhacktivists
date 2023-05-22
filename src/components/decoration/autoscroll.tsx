import { animated, useSprings } from '@react-spring/web';
import { useMemo } from 'react';

export interface AutoScrollProps {
  items: React.ReactNode[];
  rows?: number;
}

export const AutoScroll = ({ items, rows = 3 }: AutoScrollProps) => {
  const itemsPerRow = Math.ceil(items.length / rows);

  const chunks = useMemo(() => {
    return Array(rows)
      .fill(true)
      .map((_, i) => {
        return items.slice(i * itemsPerRow, (i + 1) * itemsPerRow);
      });
  }, [items, itemsPerRow, rows]);

  const [springs] = useSprings(rows, (row) => {
    return {
      loop: true,
      from: {
        transform: row % 2 === 0 ? 'translateX(50%)' : 'translateX(-50%)',
      },
      to: {
        transform: row % 2 === 0 ? 'translateX(-50%)' : 'translateX(50%)',
      },
      config: {
        duration: 10000,
      },
    };
  });

  return (
    <div className="flex flex-col gap-3 flex-nowrap w-full overflow-x-hidden">
      {chunks.map((chunk, chunkIndex) => (
        <div
          className="flex flex-row flex-nowrap gap-3 group flex-shrink-0 relative"
          key={chunkIndex}
        >
          {[...chunk, ...chunk, ...chunk].map((item, i) => (
            <animated.div
              key={i}
              style={springs[chunkIndex]}
              className="group-even:-translate-x-1/2 flex-shrink-0"
            >
              {item}
            </animated.div>
          ))}
        </div>
      ))}
    </div>
  );
};
