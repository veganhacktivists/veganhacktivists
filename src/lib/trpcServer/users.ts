import { TRPCError } from '@trpc/server';

import createRouter from './context';

import { updateUser } from 'lib/services/users';
import { updateUserSchema } from 'lib/services/users/schemas';

const usersRouter = createRouter().mutation('updateMe', {
  input: updateUserSchema,
  resolve: ({ input, ctx: { user } }) => {
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to update your profile.',
      });
    }
    return updateUser(user.id, input);
  },
});
export default usersRouter;
