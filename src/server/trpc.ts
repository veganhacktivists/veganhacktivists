import { Decimal } from '@prisma/client/runtime';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

import type { Context } from './context';

superjson.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Decimal(v),
  },
  'decimal.js'
);

export const t = initTRPC.context<Context>().create({ transformer: superjson });
