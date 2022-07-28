import { TRPCError } from '@trpc/server';

import createRouter from './context';

import { updateUser, updateUserSchema } from 'lib/services/users';

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
