import { useEffect, useRef } from 'react';

const useOnce = (callback: () => void) => {
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) return;

    isFirstRenderRef.current = false;
    callback();
  }, [callback]);
};

export default useOnce;
