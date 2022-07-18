import { useEffect, useRef } from 'react';

interface UseOnceOptions {
  enabled?: boolean;
}

const useOnce: (callback: () => void, options?: UseOnceOptions) => void = (
  callback,
  options = {}
) => {
  const { enabled = true } = options;
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!enabled || !isFirstRenderRef.current) return;

    isFirstRenderRef.current = false;
    callback();
  }, [callback, enabled]);
};

export default useOnce;
