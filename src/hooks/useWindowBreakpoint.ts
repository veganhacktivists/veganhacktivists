import resolveConfig from 'tailwindcss/resolveConfig';
import { useMemo } from 'react';

import tailwindConfig from '../../tailwind.config';

import type { Config as TailwindConfig } from 'tailwindcss';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const fullConfig = resolveConfig(tailwindConfig);

const useWindowBreakpoint: (
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
) => number = (size) => {
  const breakpointStr = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    () => (fullConfig.theme as any).screens[size] as string,
    [size]
  );

  return parseInt(breakpointStr.replace(/\D/g, ''));
};

export default useWindowBreakpoint;
