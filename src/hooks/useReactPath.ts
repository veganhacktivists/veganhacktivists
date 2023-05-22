import { useEffect, useState } from 'react';

/**
 * Hook that provides the pathname of the current page according to its changes made through history "popstate" events.
 * (e.g.: navigating back and forward with the browser's arrows).
 * @return {string} The pathname of the current page.
 */
const useReactPath = () => {
  const [pathname, setPathname] = useState<string>();

  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPathname(winPath);
  };

  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);

  return pathname;
};

export default useReactPath;
