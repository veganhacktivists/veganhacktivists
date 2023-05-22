import { baseProcedure } from '../../procedures';
import { getDataDashboardProjectByIdSchema } from '../../../lib/services/data/schemas';
import {
  getDataDashboardProject,
  getDataDashboardProjects,
} from '../../../lib/services/data';

import { t } from 'server/trpc';

const dataRouter = t.router({
  getDataDashboardProjects: baseProcedure.query(async () => {
    return await getDataDashboardProjects();
  }),
  getDataDashboardProject: baseProcedure
    .input(getDataDashboardProjectByIdSchema)
    .query(async ({ input }) => {
      return await getDataDashboardProject(input);
    }),
});

export default dataRouter;
