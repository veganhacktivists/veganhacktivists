import tailwindConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import type { TailwindColorConfig } from 'tailwindcss/tailwind-config';

const fullConfig = resolveConfig(tailwindConfig as any);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const colors = fullConfig.theme.colors!;

const byString: (object: TailwindColorConfig, path: string) => string = (
  object,
  path
) => {
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  const a = path.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in object) {
      object = (object as any)[k];
    } else {
      return;
    }
  }
  return object;
};

const useThemeColor: (color: string) => string = (color) => {
  if (!color.includes('-')) {
    color += '-DEFAULT';
  }

  return byString(colors, color.replaceAll('-', '.'));

  // return parseInt(breakpointStr.replace(/\D/g, ''));
};

export default useThemeColor;
