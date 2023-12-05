import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => new PrismaClient();

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.cachedPrisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.cachedPrisma = prisma;
}
