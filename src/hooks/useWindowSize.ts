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
  const [windowSize, setWindowSize] = useState<Size>({
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
      setWindowSize({
        width:
          'innerWidth' in element ? element.innerWidth : element.clientWidth,
        height:
          'innerHeight' in element ? element.innerHeight : element.clientHeight,
        scroll:
          'scrollWidth' in element
            ? {
                width: element.scrollWidth,
                height: element.scrollHeight,
              }
            : { width: undefined, height: undefined },
      });
    };

    element.addEventListener('resize', handleResize);
    handleResize();

    return () => element.removeEventListener('resize', handleResize);
  }, [elementRef]);

  return windowSize;
};

export default useWindowSize;
