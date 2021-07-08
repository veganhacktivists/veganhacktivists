# [Vegan Hacktivists](https://new.veganhacktivists.org/)

Our official website. On here you can find information about the different projects Vegan Hacktivists has been working on throughout the last couple of years. You can also find out what services we provide, who we are, who we partner with and read our blog.

## Introduction

Team Avocado is the new JavaSccript focused team of the Vegan Hacktivists. We're going to take on more projects in the future, but as the first one we're gonna rebuild our old main website https://veganhacktivists.org/ ➡️ https://new.veganhacktivists.org/.

We're using Next.js and Tailwind for that. In [this trello board](https://trello.com/b/7FMaTCuc/veganhacktivistsorg) you can find more stuff in the info column, for example, some of the images to be used, fonts, colors... On the board you can also access the `Things to do` cards. If you are doubting which card to pick first, talk to [Joaquín [TL] 🇪🇸](https://github.com/JoaquinTrinanes) and we'll take a look at the avaliable ones or even create others, in order for you to get used to the project.

Because this team is so new I still have to document all of this somewhere, so reach out to the **#🥑vegan-hacktivists** channel on Discord if you need anything or something is missing! 💚

## Table of contents

- [Vegan Hacktivists](#vegan-hacktivists)
  - [Introduction](#introduction)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Coding conventions and guidelines](#coding-conventions-and-guidelines)
    - [Configuring your editor](#configuring-your-editor)
  - [Grab a card](#grab-a-card)
  - [Frequently Asked Questions](#frequently-asked-questions)
    - [How should URLs be formatted?](#how-should-urls-be-formatted)
  - [Resources](#resources)

## Getting Started

Install the dependencies:

```bash
yarn install
```

Install the hooks:

```bash
yarn husky install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

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

### How should URLs be formatted?

URLs should use dashes (`-`) instead of underscores (`_`), so `/this-is/my/page` instead of `/this_is/my/page`?

## Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
