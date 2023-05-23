import { animated, useSprings, config, useTrail } from '@react-spring/web';
import { useMemo, useRef } from 'react';

export interface AutoScrollProps {
  items: React.ReactNode[];
  rows?: number;
}

interface AnimatedRowProps {
  items: React.ReactNode[];
  backwards?: boolean;
}
const AnimatedRow = ({ items, backwards = false }: AnimatedRowProps) => {
  const repeats = 2;
  const x = 100;
  const [springs, api] = useSprings(items.length * repeats, () => {
    return {
      from: {
        transform: `translateX(${x / repeats}%)`, //  `translateX(0%)` // backwards ? `translateX(${x}%)` : `translateX(${-x}%)`,
        // left: backwards ? '0%' : '0',
      },
      to: {
        transform: backwards ? `translateX(${-x}%)` : `translateX(${x}%)`,
        // left: backwards ? '-10%' : '110%',
      },
      loop: true,
      // reverse: backwards,
      config: {
        // ...config.molasses,
        // progress: 0.5,
        duration: 2000, // * items.length,
      },
      // onRest: (a, controller) => {
      //   console.log('rest');

      //   controller.set({ transform: 'translateX(0%)' });
      // },
    };
  });

  const duplicatedItems = useMemo(() => {
    return Array(repeats)
      .fill(true)
      .flatMap((_, j) =>
        items.map((item, i) => (
          <animated.div
            key={`${i}-${j}`}
            // className="group-even:-translate-x-1/2 flex-shrink-0 relative"
            className="flex-shrink-0 relative"
            style={springs[i]}
          >
            {item}
          </animated.div>
        ))
      );
  }, [items, springs]);

  return (
    <div className="flex flex-row flex-shrink-0 flex-nowrap justify-start gap-3 group relative w-[200%]">
      {duplicatedItems}
    </div>
  );
};

export const AutoScroll = ({ items, rows: rowNumber = 3 }: AutoScrollProps) => {
  const itemsPerRow = Math.ceil(items.length / rowNumber);

  const rows = useMemo(() => {
    return Array(rowNumber)
      .fill(true)
      .map((_, i) => {
        return items.slice(i * itemsPerRow, (i + 1) * itemsPerRow);
      });
  }, [items, itemsPerRow, rowNumber]);

  const containerRef = useRef<HTMLDivElement>(null);
  // const { width: containerWidth } = useWindowSize(containerRef);

  const animatedRows = useMemo(
    () =>
      rows
        .slice(0, 1)
        .map((row, i) => (
          <AnimatedRow key={i} items={row} backwards={i % 2 !== 0} />
        )),
    [rows]
  );
  // const animatedRows = useMemo(
  //   () =>
  //     rows.map((row, rowIndex) => (
  //       <div
  //         className="flex flex-row flex-nowrap gap-3 group flex-shrink-0 justify-center relative w-full"
  //         key={rowIndex}
  //       >
  //         {row.flatMap((item, i) =>
  //           Array(repeats)
  //             .fill(true)
  //             .map((_, inner) => (
  //               <animated.div
  //                 key={`${i}-${inner}`}
  //                 style={springs[rowIndex * itemsPerRow + i]}
  //                 className="group-even:-translate-x-1/2 flex-shrink-0"
  //               >
  //                 {item}
  //               </animated.div>
  //             ))
  //         )}
  //       </div>
  //     )),
  //   [itemsPerRow, rows, springs]
  // );

  return (
    <div
      className="flex flex-col gap-3 flex-nowrap overflow-x-hidden relative w-[200%]"
      ref={containerRef}
    >
      {animatedRows}
    </div>
  );
};
