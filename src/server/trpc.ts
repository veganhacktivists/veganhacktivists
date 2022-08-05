import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

import type { Context } from './context';

export const t = initTRPC<{ ctx: Context }>()({
  transformer: superjson,
});
