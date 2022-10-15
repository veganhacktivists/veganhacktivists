import { baseProcedure } from '../../procedures';
import { getDataDashboardProjectByLabelSchema } from '../../../lib/services/data/schemas';
import { getDataDashboardProject } from '../../../lib/services/data';

import { t } from 'server/trpc';

const dataRouter = t.router({
  getDataDashboardProject: baseProcedure
    .input(getDataDashboardProjectByLabelSchema)
    .query(async ({ input }) => {
      return await getDataDashboardProject(input);
    }),
});

export default dataRouter;
