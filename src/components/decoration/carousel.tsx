import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

import useWindowSize from 'hooks/useWindowSize';
import useWindowBreakpoint from 'hooks/useWindowBreakpoint';

export interface CarouselProps {
  items: React.ReactNode[];
  layout?: 'horizontal' | 'grid';
  className?: string;
  theme?: 'light' | 'dark';
  pageWidth?: number;
}

export const Carousel = ({
  items,
  className,
  layout = 'horizontal',
  theme = 'light',
  pageWidth = 3,
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLUListElement>(null);

  const { width = 1920 } = useWindowSize(scrollRef);
  const mdBreakpoint = useWindowBreakpoint('md');

  const isSmallScreen = width <= mdBreakpoint;

  const itemsPerPage =
    (isSmallScreen ? 1 : pageWidth) * (layout === 'grid' ? 3 : 1);

  const numPages = Math.ceil(items.length / itemsPerPage);

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    listItemsRef.current = listItemsRef.current.slice(0, items.length);
  }, [items.length]);

  const getHandlePageChange = useCallback(
    (newPage: number) => () => {
      const itemIndex = newPage * itemsPerPage;
      const item = listItemsRef.current[itemIndex];

      item?.scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'smooth',
      });
      setCurrentPage(newPage);
    },
    [itemsPerPage]
  );

  return (
    <div
      className="space-y-3 mx-auto w-full"
      style={{
        maxWidth: `${16 * itemsPerPage + 1}rem`,
      }}
    >
      <div className="">
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
      </div>
      <div className="flex flex-row gap-3 justify-center items-center flex-wrap">
        {[...Array(numPages)].map((_, i) => (
          <button
            onClick={getHandlePageChange(i)}
            type="button"
            key={i}
            className={classNames(
              'w-3 h-3 flex-shrink-0',
              currentPage === i
                ? theme === 'light'
                  ? 'bg-white'
                  : 'bg-gray-dark'
                : 'bg-[#737373]'
            )}
          />
        ))}
      </div>
    </div>
  );
};
