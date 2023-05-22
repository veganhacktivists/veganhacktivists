import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import React from 'react';

import useWindowSize from 'hooks/useWindowSize';

export interface CarouselProps {
  items: React.ReactNode[];
  layout?: 'horizontal' | 'grid';
  className?: string;
  theme?: 'light' | 'dark';
}

const BUTTON_THEME_CLASSNAMES: Record<
  NonNullable<CarouselProps['theme']>,
  string
> = {
  light: 'bg-white',
  dark: 'bg-dark-gray',
};

export const Carousel = ({
  items,
  className,
  layout = 'horizontal',
  theme = 'light',
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
          'grid grid-rows-3 grid-flow-col': layout === 'grid',
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
                'w-3 h-3',
                currentPage === i
                  ? BUTTON_THEME_CLASSNAMES[theme]
                  : 'bg-[#737373]'
              )}
            />
          ))}
      </div>
    </div>
  );
};
