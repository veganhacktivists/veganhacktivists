import { animated, useSprings } from '@react-spring/web';
import { useMemo, useRef } from 'react';

export interface AutoScrollProps {
  items: React.ReactNode[];
  rows?: number;
}

const repeats = 4;

export const AutoScroll = ({ items, rows: rowNumber = 3 }: AutoScrollProps) => {
  const itemsPerRow = Math.ceil(items.length / rowNumber);

  const rows = useMemo(() => {
    return Array(rowNumber)
      .fill(true)
      .map((_, i) => {
        return items.slice(i * itemsPerRow, (i + 1) * itemsPerRow);
      });
  }, [items, itemsPerRow, rowNumber]);

  const [springs] = useSprings(rowNumber, (row) => {
    return {
      loop: true,
      from: {
        // transform: 'translateX(0%)',
        transform: row % 2 === 0 ? 'translateX(100%)' : 'translateX(-100%)',
      },
      to: {
        transform: row % 2 === 0 ? 'translateX(-100%)' : 'translateX(100%)',
      },
      config: {
        duration: 10000,
      },
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  // const { width: containerWidth } = useWindowSize(containerRef);

  const animatedRows = useMemo(
    () =>
      rows.map((row, rowIndex) => (
        <div
          className="flex flex-row flex-nowrap gap-3 group flex-shrink-0 justify-center relative"
          key={rowIndex}
        >
          {row.map((item, i) =>
            Array(repeats)
              .fill(true)
              .map((_, inner) => (
                <animated.div
                  key={`${i}-${inner}`}
                  style={springs[rowIndex]}
                  className="group-even:-translate-x-1/2 flex-shrink-0"
                >
                  {item}
                </animated.div>
              ))
          )}
        </div>
      )),
    [rows, springs]
  );

  return (
    <div
      className="flex flex-col gap-3 flex-nowrap w-full overflow-x-hidden"
      ref={containerRef}
    >
      {animatedRows}
    </div>
  );
};
