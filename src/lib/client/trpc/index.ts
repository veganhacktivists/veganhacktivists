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
