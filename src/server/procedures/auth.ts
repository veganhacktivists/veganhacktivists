import { TRPCError } from '@trpc/server';
import { UserRole } from '@prisma/client';

import { baseProcedure } from '.';

import { t } from 'server/trpc';

export const protectedProcedure = baseProcedure.use(
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
    if (ctx.user?.role !== UserRole.Admin) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  })
);
