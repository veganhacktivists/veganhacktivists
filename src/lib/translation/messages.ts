import en from '../../../translation/data/compiled-en.json';
import de from '../../../translation/data/compiled-de.json';
import dev from '../../../translation/data/compiled-dev.json';
import zh from '../../../translation/data/compiled-zh.json';

export const messages: Record<string, Record<string, string>> = {
  en,
  de,
  ...(process.env.NODE_ENV === 'development' && { dev }),
  zh,
};
