/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRPCError } from '@trpc/server';

import { t } from 'server/trpc';

import type { Context } from 'server/context';
import type { z } from 'zod';

export const ctxInput = <T extends z.ZodTypeAny>(
  getZodType: (ctx: Context) => T
) =>
  t.middleware(async ({ next, ctx, rawInput }) => {
    const result = await getZodType(ctx).safeParseAsync(rawInput);

    if (result.success) {
      return next({
        ctx: {
          ctxInput: result.data,
        },
      });
    }

    if (result.error instanceof TRPCError) {
      throw result.error;
    }
    throw new TRPCError({ code: 'BAD_REQUEST', cause: result.error });
  });
