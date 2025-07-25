import resolveConfig from 'tailwindcss/resolveConfig';
import { useMemo } from 'react';

import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

const useWindowBreakpoint: (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => number =
  (size) => {
    const breakpointStr = useMemo(
      () => (fullConfig.theme as any).screens[size] as string,
      [size],
    );

    return Number.parseInt(breakpointStr.replace(/\D/g, ''));
  };

export default useWindowBreakpoint;
