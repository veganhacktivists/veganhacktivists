import { t } from '../trpc';

import discordRouter from './discord';
import playgroundRouter from './playground';
import dataRouter from './data';

export const appRouter = t.router({
  playground: playgroundRouter,
  data: dataRouter,
  discord: discordRouter,
});

export type AppRouter = typeof appRouter;
