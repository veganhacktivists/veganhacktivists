import { PrismaClient, UserRole } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    name: 'userRole',
    result: {
      user: {
        isAdmin: {
          needs: { role: true },
          compute: ({ role }) => role === UserRole.Admin,
        },
        isOrganization: {
          needs: { role: true },
          compute: ({ role }) =>
            role === UserRole.Admin || role === UserRole.Organization,
        },
        isApplicant: {
          needs: { role: true },
          compute: ({ role }) =>
            role === UserRole.Admin || role === UserRole.Applicant,
        },
      },
    },
  });
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
