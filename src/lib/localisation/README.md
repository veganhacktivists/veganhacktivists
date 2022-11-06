# localisation

Translations are implemented with [react-intl](https://formatjs.io/docs/getting-started/installation/)

## how to add localisations

1. Add the localisation key to `next.config.js` `nextConfig.i18n.locales`
2. Copy `src/localisation/en.json` to `{localisation key}.json`
3. In `src/lib/localisation/index.d.ts` import the new localisation file and add the localisation key and translation keys to their respective types
4. In `src/lib/localisation/messages.ts` import the new localisation file and add to the messages object
