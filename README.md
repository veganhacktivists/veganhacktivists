# [Vegan Hacktivists](https://veganhacktivists.org/)

Our official website. On here you can find information about the different projects Vegan Hacktivists has been working on throughout the last couple of years. You can also find out what services we provide, who we are, who we partner with and read our blog.

## Introduction

Team Avocado is focused on JavaScript and responsible for our organization’s website https://veganhacktivists.org/

We're using Next.js and Tailwind for that. In [this trello board](https://trello.com/b/7FMaTCuc/veganhacktivistsorg) you can find more stuff in the info column, for example, some of the images to be used, fonts, colors... On the board you can also access the `Things to do` cards. If you are doubting which card to pick first, talk to [Tobias [Team Lead] 🇩🇪](https://github.com/headscracher) and we'll take a look at the available ones or even create others, in order for you to get used to the project.

Because this team is so new we still have to document all of this somewhere, so reach out to the **#🥑vegan-hacktivists** channel on Discord if you need anything or something is missing! 💚

## Table of contents

- [Vegan Hacktivists](#vegan-hacktivists)
  - [Introduction](#introduction)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Setting up env vars](#setting-up-env-vars)
    - [Setting up the database](#setting-up-the-database)
    - [Installing the dependencies](#installing-the-dependencies)
    - [Migrate and seed the database](#migrate-and-seed-the-database)
    - [Gain access to admin pages](#gain-access-to-admin-pages)
    - [Coding conventions and guidelines](#coding-conventions-and-guidelines)
    - [Configuring your editor](#configuring-your-editor)
    - [Translations](#translations)
  - [Grab a card](#grab-a-card)
  - [Frequently Asked Questions](#frequently-asked-questions)
  - [Resources](#resources)

## Getting Started

### Setting up env vars

There's a sample `.env.example` file with the values that need to be defined and some sensible defaults.

```bash
cp .env.example .env # .env.local works too!
```

To get the basic functionality to work you'll need at least:

- CF_SPACE_ID
- CF_DELIVERY_ACCESS_TOKEN

Ask your team lead for any key you might need!

### Setting up the database

A `docker-compose.yml` file is included in the project. It requires a the database environment variables to be set up (see [Setting up env vars](#setting-up-env-vars)).

```bash
docker compose up -d db
```

This command will create a database container listening on the port 5432 of your machine. To stop it, run:

```bash
docker compose down
```

### Setting up the SMTP-Server

Running the smtp server is only necessary if you wish to login which can be useful for accessing admin functionality (see [Gain access to admin pages](#gain-access-to-admin-pages)). The `docker-compose.yml` inclues a smtp service, which is providing a simple smtp server without authentification accessible under port 2525.

```bash
docker compose up -d smtp
```

### Installing the dependencies

We use `pnpm` as a package manager. Install it whatever way fits you best https://pnpm.io/installation. Note that **you need at least version `>=7.0.0`**.

Install the dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Migrate and seed the database

Your database will be empty by default. We use [prisma](https://prisma.io) as an ORM.

Prisma will be installed along with the other dependencies if you followed the steps in [Installing the dependencies](#installing-the-dependencies).

There are three key concepts at play here: `generate`, `migrate` and `seed`.

- Running `pnpm prisma generate` will create the client that connects to the database, as well as the types to access them safely from the code. For example, given a `User` model, it will allow this:

  ```ts
  import type { User } from "@prisma/client";
  import prisma from "lib/db/prisma";
  const users = prisma.findMany(); // users is of User[] type!
  ```

- `pnpm prisma migrate dev` will apply all pending migrations to the database. If there are changes to the schema, it will also create a migration with those new changes. In production, migrations are applied during the build phase of the project. If you want to prototype database schemas it is recommended to use `pnpm prisma db push` instead, as it will avoid creating unnecessary migrations.

- `pnpm prisma db seed` will run the `prisma/seed.ts` script. It's purpose is to populate the database with sample data to improve the development experience.

### Gain access to admin pages

To gain access to restricted pages you first need a working smtp-setup.
To setup a local running smtp server see: [Setting up the SMTP-Server](#setting-up-the-smtp-server)

Make sure that the email server settings are properly set in your .env file since our
authentication is working with magic links.

Start your development server and navigate to [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin) and fill in a valid e-mail address. You'll receive a confirmation link you'll have to click.

Afterwards you need to use a database tool of your choice to connect to the postgresql database. You can also use `pnpm prisma studio` to access the database.

Looking at the users table you should see your email address under the last create users. Now change the field Role from User to Admin.
After changing your role you need to [log-out](http://localhost:3000/auth/signout) and [log-in](http://localhost:3000/auth/signin) again to renew your permissions.

### Coding conventions and guidelines

We are still figuring this out as we go, but for now we follow [these guidelines for TypeScript](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md) and [these conventions for React](https://github.com/basarat/typescript-book/blob/master/docs/jsx/react.md).

As for Git conventions, we try to follow the style guide as described [here](https://github.com/agis/git-style-guide).

#### Commenting code

#### What to comment?

With typescript, commenting is quite different compared to javascript because data types are documented with the language already. So when writing code, we should focus on explaining decisions and motivations, rather than how or when to use this code block.  
Often there are multiple ways to code something, the decision should be explained above the implementation.  
Avoid unnecessary or redundant comments, such as those that simply restate the code.

- Code blocks e.g. functions, including react components, and classes
  - Explain the motivation for this code block and if available, reference the corresponding Trello card.
  - If there are similar code blocks, write a short explanation what differentiates them and the necessity for the similar block.
- Inside these code blocks
  - Too complex or not easily understood code should not be written. If it is, explain why, and what this code should do.

#### Format

Use [TSDoc](https://tsdoc.org) as commenting style.

#### Examples

```typescript
/**
 * Because it is required in HTML email bodies, <br/> tags are used instead of line separators.
 */
export const createFormattedHTMLMessage: (
  data: Record<string, string>
) => string = (data) => {
  return Object.entries(data)
    .map(([field, value]) => {
      field = firstLetterUppercase(field);
      return `<b>${
        field.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ") ?? field
      }:</b> ${String(value).trim().split("\n").join("<br/>")}`;
    })
    .join("<br/>");
};
```

```typescript
/**
 * What differentiates this from a useEffect call with empty dependencies is the option to enable/disable.
 */
const useOnce = (callback: () => void, options: UseOnceOptions = {}) => {
  const { enabled = true } = options;
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!enabled || !isFirstRenderRef.current) return;

    isFirstRenderRef.current = false;
    callback();
  }, [callback, enabled]);

  return !isFirstRenderRef.current;
};
```

### Configuring your editor

It is recommended to install [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), although the commit hooks will already take care of the formatting.

It is also recommended to activate the `Editor: Format on save` option.

## Translations

Translations are implemented with [react-intl](https://formatjs.io/docs/getting-started/installation/)

### How to use translations

[FormattedMessage](https://formatjs.io/docs/react-intl/components/#formattedmessage)

```xml
<FormattedMessage id="page.example.headline" defaultMessage="Example" />
```

[useIntl](https://formatjs.io/docs/react-intl/api/#useintl-hook)

```typescript
const intl = useIntl();
intl.formatMessage({ id: "page.example.headline", defaultMessage: "Example" });
```

### Ids

Ids are created from context kinds and names, starting with the root element of the component and ending with the translation target. Segments are concatenated with dots. Ids must be lowercase and written in kebab style. This is to avoid duplicate IDs and provide some context to translators.

example for a headline on the index page:

`page.index.section.projects.headline`

### Scripts

`pnpm translation:compile` compiles all messages into a format consumable by react-intl.  
`pnpm translation:extract` finds new messages and extracts them into `/translation/data/en.json`. Runs `translation:compile` afterwards.  
`pnpm translation:update` compares the defaultMessages in `FormattedMessage` and `intl.formatMessage` with previously extracted messages and updates the code where differences are found.  
`pnpm translation:translate` next.config.ts locales will be used as language key for the deepl translation API, to generate translations of missing messages of the corresponding language. Results are written to `/translation/data/{locale}.json`. Runs `translation:compile` afterwards.

### How to add new translations

Add new translations by updating the array `nextConfig.i18n.locales` in `next.config.js`.  
Translations will be generated in a pipeline job or by using the above scripts.

### Ignore text/variables in messages during the translation process

Wrap the part of the message in a `no-localization` tag:  
`Donate <no-localization>{currencyName}</no-localization>`  
The `no-localization` tag will exclude it from translation and keep the variable name.

## Grab a card

Steps for working on a card from [our Trello board](https://trello.com/b/7FMaTCuc/veganhacktivistsorg):

- Grab a card from the `Things to do` column and drag it to the `In Progress` column
- Create a new branch `feature/my-new-feature` off the `main` branch
- Create a Pull Request when you're done
- Move the card to `PR Ready`
- Sit back and wait for approvals or comments!

Feel free to ask other team members to review Pull Requests.

## Frequently Asked Questions

- ### How should URLs be formatted?
  URLs should use dashes (`-`) instead of underscores (`_`), so `/this-is/my/page` should be used instead of `/this_is/my/page`.

## Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
