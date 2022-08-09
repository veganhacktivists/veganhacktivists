/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc';

import discordRouter from './discord';

import playgroundRouter from './playground';
import usersRouter from './users';

export const appRouter = t.router({
  playground: playgroundRouter,
  users: usersRouter,
  discord: discordRouter,
});

export type AppRouter = typeof appRouter;
