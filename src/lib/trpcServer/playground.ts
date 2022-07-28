import createRouter from './context';

import { getPlaygroundRequests } from 'lib/services/playground';
import { getPlaygroundRequestsSchema } from 'lib/services/playground/schemas';

const playgroundRouter = createRouter().query('getPlaygroundRequests', {
  input: getPlaygroundRequestsSchema,
  resolve: async ({ input }) => {
    return await getPlaygroundRequests(input);
  },
});

export default playgroundRouter;
