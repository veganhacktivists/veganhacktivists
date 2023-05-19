import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import React from 'react';

import useWindowSize from 'hooks/useWindowSize';

export interface CarouselProps {
  items: React.ReactNode[];
  layout?: 'horizontal' | 'grid';
  className?: string;
}
export const Carousel = ({
  items,
  className,
  layout = 'horizontal',
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLUListElement>(null);
  const {
    width,
    scroll: { width: scrollWidth },
  } = useWindowSize(scrollRef);

  const pages = Math.ceil(scrollWidth! / width!) || 0;

  const getHandlePageChange = useCallback(
    (newPage: number) => () => {
      setCurrentPage(newPage);
      const newScroll = (width! / 2) * newPage;
      scrollRef.current!.scrollTo({ left: newScroll, behavior: 'smooth' });
    },
    [width]
  );

  return (
    <div>
      <ul
        ref={scrollRef}
        className={classNames('overflow-hidden gap-4', className, {
          'flex flex-row flex-nowrap': layout === 'horizontal',
        })}
      >
        {items.map((item, i) => (
          <li key={i} className="flex-shrink-0 w-64">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-3 justify-center items-center">
        {Array(pages)
          .fill(true)
          .map((_, i) => (
            <button
              onClick={getHandlePageChange(i)}
              type="button"
              key={i}
              className={classNames(
                'w-2 h-2 bg-white',
                currentPage === i && 'bg-grey'
              )}
            />
          ))}
      </div>
    </div>
  );
};
