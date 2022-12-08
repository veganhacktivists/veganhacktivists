# Localisation

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

`pnpm translation:extract` finds new messages and extracts them into `/localisation/data/en.json`.  
`pnpm translation:update` compares the defaultMessages in `FormattedMessage` and `intl.formatMessage` with previously extracted messages and updates the code where differences are found.

## How to add new localisations

1. In `src/lib/localisation/messages.ts` import the new localisation file and add to the messages object
2. Enable by adding the localisation key to `next.config.js` `nextConfig.i18n.locales`
