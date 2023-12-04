import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type Prisma = ReturnType<typeof prismaClientSingleton>;

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ReturnType<typeof prismaClientSingleton> | undefined;
}
const prisma =
  (globalThis as typeof globalThis & { prisma?: Prisma }).prisma ??
  prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.cachedPrisma = prisma;
}
