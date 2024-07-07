# /pages -> /app migration notes

During the transition, shared features are duplicated. For example the trpc integration is done for the app and the pages router.

## trpc

trpc is configured to use createTRPCReact for in the app directory.
pages continues using the

example repo  
https://github.com/devietti/trpc-next13-app/blob/main/src/app/servercomponent/page.tsx

## unwanted behaviour

Navigating from "app" to "pages" adds the locale as query parameter to the url.
