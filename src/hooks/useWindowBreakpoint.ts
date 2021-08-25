import tailwindConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useMemo } from 'react';

const fullConfig = resolveConfig(tailwindConfig as any);

const useWindowBreakpoint: (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => number =
  (size) => {
    const breakpointStr = useMemo(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      () => fullConfig.theme.screens![size],
      [size]
    );

    return parseInt(breakpointStr.replace(/\D/g, ''));
  };

export default useWindowBreakpoint;
