import { useState, useEffect } from 'react';

import type { RefObject } from 'react';

interface Size {
  width?: number;
  height?: number;
  scroll: Omit<Size, 'scroll'>;
}

const useWindowSize = (elementRef?: RefObject<HTMLElement>): Size => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
    scroll: {
      width: undefined,
      height: undefined,
    },
  });

  useEffect(() => {
    const element = elementRef?.current ?? window;
    const handleResize = () => {
      setSize({
        width:
          'innerWidth' in element ? element.innerWidth : element.clientWidth,
        height:
          'innerHeight' in element ? element.innerHeight : element.clientHeight,
        scroll: {
          width: 'scrollWidth' in element ? element.scrollWidth : undefined,
          height: 'scrollHeight' in element ? element.scrollHeight : undefined,
        },
      });
    };

    element.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      element.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef]);

  return size;
};

export default useWindowSize;
