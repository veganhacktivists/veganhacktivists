import { TRPCError } from '@trpc/server';

import { t } from 'server/trpc';

export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        user: ctx.user,
      },
    });
  })
);

export const adminProcedure = protectedProcedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (ctx.user?.role !== 'Admin') {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  })
);
