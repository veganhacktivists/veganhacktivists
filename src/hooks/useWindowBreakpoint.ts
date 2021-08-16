import tailwindConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig as any);

const useWindowBreakpoint: (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => number =
  (size) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const breakpointStr = fullConfig.theme.screens![size];

    return parseInt(breakpointStr.replace(/\D/g, ''));
  };

export default useWindowBreakpoint;
