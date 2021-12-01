/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import tailwindConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useMemo } from 'react';

const fullConfig = resolveConfig(tailwindConfig as any);

const useWindowBreakpoint: (
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
) => number = (size) => {
  // @ts-expect-error
  const breakpointStr = useMemo(() => fullConfig.theme.screens![size], [size]);

  return parseInt(breakpointStr.replace(/\D/g, ''));
};

export default useWindowBreakpoint;
