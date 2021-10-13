/* eslint-disable @typescript-eslint/no-explicit-any */
import tailwindConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig as any);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const colors = fullConfig.theme.colors!;

const byString: (object: any, path: string) => string | undefined = (
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

const useThemeColor: (color: string) => string | undefined = (color) => {
  if (color.startsWith('#')) {
    return color;
  }

  const obj = byString(
    colors,
    color.replace(
      /([a-z]+)-(light|dark|background|over-background|border)/g,
      '$1.$2'
    )
  );

  return (obj as any).DEFAULT || obj;
};

export default useThemeColor;
