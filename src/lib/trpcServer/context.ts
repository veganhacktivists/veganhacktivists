import { unstable_getServerSession } from 'next-auth';

import * as trpc from '@trpc/server';

import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  return {
    user: session?.user,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

const createRouter = () => trpc.router<Context>();

export default createRouter;
