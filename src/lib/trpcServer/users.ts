import { createProtectedRouter } from './context';

import { updateUser } from 'lib/services/users';
import { updateUserSchema } from 'lib/services/users/schemas';

const usersRouter = createProtectedRouter().mutation('updateMe', {
  input: updateUserSchema,
  resolve: ({ input, ctx: { user } }) => {
    return updateUser(user.id, input);
  },
});

export default usersRouter;
