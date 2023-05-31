import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

import useWindowSize from 'hooks/useWindowSize';

import type { UIEventHandler } from 'react';

export interface CarouselProps {
  items: React.ReactNode[];
  layout?: 'horizontal' | 'grid';
  theme?: 'light' | 'dark';
  pageWidth?: number;
  itemWidth?: number;
}

export const Carousel = ({
  items,
  layout = 'horizontal',
  theme = 'light',
  pageWidth = 3,
  itemWidth = 256,
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handleScroll = useCallback<UIEventHandler<HTMLUListElement>>((e) => {
    const target = e.target as HTMLUListElement;
    const scrollLeft = target.scrollLeft;
    const width = target.clientWidth;

    const page = Math.round(scrollLeft / width);
    setCurrentPage(page);
  }, []);

  const { width = 1920 } = useWindowSize();

  const numberOfRows = layout === 'grid' ? pageWidth : 1;

  const itemsPerPage =
    Math.min(Math.max(Math.floor(width / itemWidth), 1), pageWidth) *
    numberOfRows;

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
      });
    },
    [itemsPerPage]
  );

  return (
    <div
      className="space-y-16 mx-auto w-full"
      style={{
        // (16rem w + 1rem gap) * items x - 1rem gap
        maxWidth: `${
          (itemWidth / 16 + 1) * Math.ceil(itemsPerPage / numberOfRows) - 1
        }rem`,
      }}
    >
      <ul
        onScroll={handleScroll}
        className={classNames(
          'overflow-auto scrollbar-none snap-x snap-mandatory gap-4 scroll-smooth',
          {
            'flex flex-row flex-nowrap': layout === 'horizontal',
            'grid grid-rows-3 grid-flow-col': layout === 'grid',
          }
        )}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={classNames('flex-shrink-0', {
              'snap-start': i % itemsPerPage === 0,
            })}
            style={{
              width: itemWidth,
            }}
            ref={(ref) => {
              listItemsRef.current[i] = ref;
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
        {[...Array(numPages)].map((_, i) => (
          <button
            onClick={getHandlePageChange(i)}
            type="button"
            key={i}
            className={classNames(
              'w-4 h-4 flex-shrink-0',
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
