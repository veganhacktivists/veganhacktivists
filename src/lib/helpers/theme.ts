// @ts-expect-error For some reason this module is not detected, awaiting fix!
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../../tailwind.config';

import type { Config as TailwindConfig } from 'tailwindcss';

const fullConfig = (
  resolveConfig as (config: TailwindConfig) => TailwindConfig
)(tailwindConfig as unknown as TailwindConfig);

const colors = fullConfig.theme!.colors!;

const byString: (
  object: string | Record<string, string>,
  path: string
) => string | Record<'DEFAULT', string> | undefined = (object, path) => {
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  const a = path.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (typeof object === 'object' && k in object) {
      object = object[k];
    } else {
      return undefined;
    }
  }
  return object as string;
};

const getThemeColor: (color: string) => string = (color) => {
  if (color.startsWith('#')) {
    return color;
  }

  const obj = byString(
    colors as unknown as Record<string, string>,
    color.replace(
      /([a-z]+)-(light|dark|background|over-background|border)/g,
      '$1.$2'
    )
  );

  if (typeof obj !== 'object') {
    return obj as string;
  }
  return obj.DEFAULT;
};

export default getThemeColor;
