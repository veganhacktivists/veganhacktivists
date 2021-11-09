import tailwindConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useMemo } from 'react';
import type { TailwindConfig } from 'tailwindcss/tailwind-config';

const fullConfig = resolveConfig(tailwindConfig as unknown as TailwindConfig);

const useWindowBreakpoint: (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => number =
  (size) => {
    const breakpointStr = useMemo(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-non-null-assertion
      () => (fullConfig.theme.screens! as any)[size],
      [size]
    );

    return parseInt(breakpointStr.replace(/\D/g, ''));
  };

export default useWindowBreakpoint;
