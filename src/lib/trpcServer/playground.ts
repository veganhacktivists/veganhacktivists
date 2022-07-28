import createRouter from './context';

import {
  getPlaygroundRequests,
  getPlaygroundRequestsSchema,
} from 'lib/services/playground';

const playgroundRouter = createRouter().query('getPlaygroundRequests', {
  input: getPlaygroundRequestsSchema,
  resolve: async ({ input }) => {
    return await getPlaygroundRequests(input);
  },
});

export default playgroundRouter;
