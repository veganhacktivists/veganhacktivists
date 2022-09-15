# [Vegan Hacktivists](https://new.veganhacktivists.org/)

Our official website. On here you can find information about the different projects Vegan Hacktivists has been working on throughout the last couple of years. You can also find out what services we provide, who we are, who we partner with and read our blog.

## Introduction

Team Avocado is the new JavaScript focused team of the Vegan Hacktivists. We're going to take on more projects in the future, but as the first one we're gonna rebuild our old main website https://veganhacktivists.org/ ➡️ https://new.veganhacktivists.org/.

We're using Next.js and Tailwind for that. In [this trello board](https://trello.com/b/7FMaTCuc/veganhacktivistsorg) you can find more stuff in the info column, for example, some of the images to be used, fonts, colors... On the board you can also access the `Things to do` cards. If you are doubting which card to pick first, talk to [Joaquín [TL] 🇪🇸](https://github.com/JoaquinTrinanes) and we'll take a look at the available ones or even create others, in order for you to get used to the project.

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
    - [Coding conventions and guidelines](#coding-conventions-and-guidelines)
    - [Configuring your editor](#configuring-your-editor)
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

The `docker-compose.yml` also inclues a smtp service, which is providing a simple smtp server without authentification accessible under port 2525.

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

Afterwards you need to use a database tool of your choice to connect to the postgresql database.

Looking at the users table you should see your email address under the last create users. Now change the field Role from User to Admin.
After changing your role you need to [log-out](http://localhost:3000/auth/signout) and [log-in](http://localhost:3000/auth/signin) again to renew your permissions.

### Coding conventions and guidelines

We are still figuring this out as we go, but for now we follow [these guidelines for TypeScript](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md) and [these conventions for React](https://github.com/basarat/typescript-book/blob/master/docs/jsx/react.md).

As for Git conventions, we try to follow the style guide as described [here](https://github.com/agis/git-style-guide).

### Configuring your editor

It is recommended to install [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), although the commit hooks will already take care of the formatting.

It is also recommended to activate the `Editor: Format on save` option.

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
