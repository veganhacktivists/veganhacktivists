import { t } from '../trpc';

import discordRouter from './discord';
import playgroundRouter from './playground';
import dataRouter from './data';
import blogRouter from './blog';
import translationRouter from './translation';

export const appRouter = t.router({
  playground: playgroundRouter,
  data: dataRouter,
  discord: discordRouter,
  blog: blogRouter,
  translation: translationRouter,
});

export type AppRouter = typeof appRouter;
