import { unstable_getServerSession } from 'next-auth';

import { getNextAuthOptions } from 'pages/api/auth/[...nextauth]';
import prisma from 'lib/db/prisma';

import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export const createContextInner = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await unstable_getServerSession(
    req,
    res,
    getNextAuthOptions(req)
  );
  return {
    req,
    res,
    prisma,
    user: session?.user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (opts: trpcNext.CreateNextContextOptions) =>
  createContextInner(opts);
