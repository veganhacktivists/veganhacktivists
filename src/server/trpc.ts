import { Prisma } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

import type { Context } from './context';

superjson.registerCustom<Prisma.Decimal, string>(
  {
    isApplicable: (v): v is Prisma.Decimal => Prisma.Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Prisma.Decimal(v),
  },
  'decimal.js'
);

export const t = initTRPC.context<Context>().create({ transformer: superjson });
