import { unstable_getServerSession } from 'next-auth';

import * as trpc from '@trpc/server';

import { TRPCError } from '@trpc/server';

import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

import type { inferAsyncReturnType } from '@trpc/server';

import type * as trpcNext from '@trpc/server/adapters/next';

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  return {
    req,
    res,
    user: session?.user,
  };
};

interface Meta {
  hasAuth: boolean;
}

type Context = inferAsyncReturnType<typeof createContext>;

const createRouter = () =>
  trpc.router<Context, Meta>().middleware(({ meta, ctx, next }) => {
    if (meta?.hasAuth && !ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });

export const createProtectedRouter = () => {
  return createRouter().middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });
};

export default createRouter;
