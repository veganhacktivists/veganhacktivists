/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRPCError, experimental_standaloneMiddleware } from '@trpc/server';

import type { z } from 'zod';

export const ctxInput = <T extends z.ZodTypeAny, C extends object>(
  getZodType: (ctx: C) => T,
) =>
  experimental_standaloneMiddleware<{
    ctx: C;
    rawInput: unknown;
    meta: any;
  }>().create(async ({ next, ctx, rawInput }) => {
    const result = await getZodType(ctx as unknown as C).safeParseAsync(
      rawInput,
    );

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
