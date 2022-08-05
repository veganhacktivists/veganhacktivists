import { updateUser } from 'lib/services/users';
import { updateUserSchema } from 'lib/services/users/schemas';
import { protectedProcedure } from 'server/procedures/auth';
import { t } from 'server/trpc';

const usersRouter = t.router({
  updateMe: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ input, ctx: { user } }) => {
      return updateUser(user.id, input);
    }),
});

export default usersRouter;
