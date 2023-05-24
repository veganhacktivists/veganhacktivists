import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
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

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    listItemsRef.current = listItemsRef.current.slice(0, items.length);
  }, [items.length]);

  const pages = (Math.ceil(scrollWidth! / width!) || 0) + 1;

  const getHandlePageChange = useCallback(
    (newPage: number) => () => {
      const itemsPerPage = Math.floor(items.length / (scrollWidth! / width!));
      const itemIndex = newPage * itemsPerPage;
      const item = listItemsRef.current[itemIndex];

      item?.scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'smooth',
      });
      setCurrentPage(newPage);
    },
    [items.length, scrollWidth, width]
  );

  return (
    <div className="space-y-3 max-w-[50rem] mx-auto">
      <ul
        ref={scrollRef}
        className={classNames('overflow-hidden gap-4', className, {
          'flex flex-row flex-nowrap': layout === 'horizontal',
          'grid grid-rows-3 grid-flow-col': layout === 'grid',
        })}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="flex-shrink-0 w-64"
            ref={(ref) => {
              listItemsRef.current[i] = ref;
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-3 justify-center items-center flex-wrap">
        {Array(pages)
          .fill(true)
          .map((_, i) => (
            <button
              onClick={getHandlePageChange(i)}
              type="button"
              key={i}
              className={classNames(
                'w-3 h-3 flex-shrink-0',
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
