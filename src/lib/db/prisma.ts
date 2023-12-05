import { PrismaClient, UserRole } from '@prisma/client';

const prismaClientSingleton = () => {
  const baseClient = new PrismaClient();
  const prisma = baseClient.$extends({
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

  return { prisma, baseClient };
};

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const clients = globalThis.cachedPrisma ?? prismaClientSingleton();
const { prisma, baseClient: basePrismaClient } = clients;

export { basePrismaClient };
export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.cachedPrisma = clients;
}
