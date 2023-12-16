/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRPCError, experimental_standaloneMiddleware } from '@trpc/server';

import type { z } from 'zod';

export const ctxInput = <T extends z.ZodType, C extends object>(
  getZodType: (ctx: C) => T,
) =>
  experimental_standaloneMiddleware<{
    ctx: C;
    rawInput: unknown;
    meta: any;
  }>().create(async ({ next, ctx, rawInput }) => {
    try {
      return next({
        ctx: {
          ctxInput: (await getZodType(ctx as unknown as C).parseAsync(
            rawInput,
          )) as z.infer<T>,
        },
      });
    } catch (cause) {
      if (cause instanceof TRPCError) {
        throw cause;
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause,
        });
      }
    }
  });
