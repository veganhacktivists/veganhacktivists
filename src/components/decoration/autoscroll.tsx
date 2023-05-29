import classNames from 'classnames';
import { useMemo } from 'react';

export interface AutoScrollProps {
  items: React.ReactNode[] | React.ReactNode[][];
}

interface AnimatedRowProps {
  items: React.ReactNode[];
  backwards?: boolean;
}

const AnimatedRow = ({ items, backwards }: AnimatedRowProps) => {
  return (
    <div
      className={classNames(
        'flex w-fit justify-center flex-row flex-1',
        backwards
          ? 'animate-infinite-scroll-reverse'
          : 'animate-infinite-scroll'
      )}
    >
      {[...items, ...items].map((item, i) => (
        <li key={i} className="max-w-xs w-fit flex-shrink-0 basis-full">
          {item}
        </li>
      ))}
    </div>
  );
};

export const Autoscroll = ({ items }: AutoScrollProps) => {
  const rows = useMemo(
    () => (Array.isArray(items[0]) ? items : [items]) as React.ReactNode[][],
    [items]
  );

  return (
    <div className="overflow-hidden w-full">
      <ul className="grayscale relative">
        {rows.map((row, i) => (
          <AnimatedRow key={i} items={row} backwards={i % 2 === 0} />
        ))}
      </ul>
    </div>
  );
};
