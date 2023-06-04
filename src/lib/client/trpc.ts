import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';
import { Decimal } from 'decimal.js';
import { httpBatchLink } from '@trpc/client';

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { NextPageContext } from 'next';
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

superjson.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Decimal(v),
  },
  'decimal.js'
);

export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config: ({ ctx }) => {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers: () => {
            if (ctx?.req) {
              return {
                ...ctx.req.headers,
                'x-ssr': '1',
              };
            }
            return {};
          },
        }),
      ],
    };
  },
});

export type TrpcInput = inferRouterInputs<AppRouter>;
export type TrpcOutput = inferRouterOutputs<AppRouter>;
