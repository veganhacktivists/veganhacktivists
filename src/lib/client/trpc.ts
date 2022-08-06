import { setupTRPC } from '@trpc/next';
import superjson from 'superjson';

import type { NextPageContext } from 'next';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from 'server/routers/_app';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env.URL) {
    return `${process.env.URL}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Extend `NextPageContext` with meta data that can be picked up by `responseMeta()` when server-side rendering
 */
export type SSRContext = NextPageContext;

export const trpc = setupTRPC<AppRouter, SSRContext>({
  config: ({ ctx }) => {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
      transformer: superjson,
      headers: () => {
        if (ctx?.req) {
          // on ssr, forward client's headers to the server
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
    };
  },
  ssr: true,
});

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;
