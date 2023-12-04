import adminRouter from './admin';
import requestsRouter from './requests';
import applicationsRouter from './applications';
import statsRouter from './stats';

import { t } from 'server/trpc';

const playgroundRouter = t.mergeRouters(
  t.router({
    admin: adminRouter,
  }),
  requestsRouter,
  applicationsRouter,
  statsRouter
);

export default playgroundRouter;
