export type Localisations = 'en';

declare global {
  namespace FormatjsIntl {
    interface IntlConfig {
      locale: Localisations;
    }
  }
}
