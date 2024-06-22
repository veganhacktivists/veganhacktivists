export const locales: readonly string[];
export const defaultLocale: string;
export const localeCookie: string | undefined;
export const localeDetector:
  | ((request: NextRequest, config: Config) => string)
  | false
  | undefined;
export const prefixDefault: boolean | undefined;
export const noPrefix: boolean | undefined;
export const basePath: string | undefined;
export const serverSetCookie: 'if-empty' | 'always' | 'never' | undefined;
