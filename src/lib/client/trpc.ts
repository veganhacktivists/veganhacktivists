/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupTRPC } from '@trpc/next';
import superjson from 'superjson';

import type { NextPageContext } from 'next';
import type {
  AnyRouter,
  inferProcedureInput,
  inferProcedureOutput,
  Procedure,
} from '@trpc/server';
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

type HandleInferenceHelpers<
  TRouterOrProcedure extends AnyRouter | Procedure<any>
> = TRouterOrProcedure extends AnyRouter
  ? GetInferenceHelpers<TRouterOrProcedure>
  : TRouterOrProcedure extends Procedure<any>
  ? {
      input: inferProcedureInput<TRouterOrProcedure>;
      output: inferProcedureOutput<TRouterOrProcedure>;
    }
  : never;

type GetInferenceHelpers<TRouter extends AnyRouter> = {
  [TKey in keyof TRouter['_def']['record']]: HandleInferenceHelpers<
    TRouter['_def']['record'][TKey]
  >;
};

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = trpc['hello']['output']
 */
export type trpc = GetInferenceHelpers<AppRouter>;
