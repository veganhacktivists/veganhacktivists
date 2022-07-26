import { PrismaClient } from '@prisma/client';

import GlobalRef from 'lib/globalRef';

// all this boilerplate is to avoid multiple clients being created while developing because of hot reloading
let prisma: PrismaClient;
if (process.env.NODE_ENV !== 'production') {
  const prismaInstance = new GlobalRef<PrismaClient>('prisma');
  if (!prismaInstance.value) {
    prismaInstance.value = new PrismaClient();
  }
  prisma = prismaInstance.value;
} else {
  prisma = new PrismaClient();
}

export default prisma;
