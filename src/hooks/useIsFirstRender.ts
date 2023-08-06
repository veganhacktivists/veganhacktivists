import { useEffect, useState } from 'react';

export function useIsFirstRender() {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => setIsFirstRender(false), []);

  return isFirstRender;
}
