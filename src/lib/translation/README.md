# Translations

Translations are implemented with [react-intl](https://formatjs.io/docs/getting-started/installation/)

## How to use translations

[FormattedMessage](https://formatjs.io/docs/react-intl/components/#formattedmessage)

```xml
<FormattedMessage id="page.example.headline" defaultMessage="Example" />
```

[useIntl](https://formatjs.io/docs/react-intl/api/#useintl-hook)

```typescript
const intl = useIntl();
intl.formatMessage({ id: "page.example.headline", defaultMessage: "Example" });
```

## Ids

Ids are created from context kinds and names, starting with the root element of the component and ending with the translation target. Segments are concatenated with dots. Ids must be lowercase and written in kebab style. This is to avoid duplicate IDs and provide some context to translators.

example for a headline on the index page:

`page.index.section.projects.headline`

## Scripts

`pnpm translation:compile` compiles all messages into a format required by react-intl.  
`pnpm translation:extract` finds new messages and extracts them into `/translation/data/en.json`. Runs `translation:compile` afterwards.  
`pnpm translation:update` compares the defaultMessages in `FormattedMessage` and `intl.formatMessage` with previously extracted messages and updates the code where differences are found.  
`pnpm translation:translate` next.config.ts locales will be used as language key for the deepl translation API, to generate translations of missing messages of the corresponding language. Results are written to `/translation/data/{languageKey}.json`. Runs `translation:compile` afterwards.

## How to add new translations

Add new translations by updating the array `nextConfig.i18n.locales` in `next.config.js`.  
Translations will be generated in a pipeline job or by using the above scripts.

## Ignore text/variables in messages during the translation process

Wrap the part of the message in a `no-localization` tag:  
`Donate <no-localization>{currencyName}</no-localization>`  
The `no-localization` tag will exclude it from translation and keep the variable name.
