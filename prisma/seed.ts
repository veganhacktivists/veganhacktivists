/* eslint-disable no-console */
import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const USER_NUMBER = 50;

const users: Pick<User, 'email'>[] = Array(USER_NUMBER)
  .fill(null)
  .map(() => ({ email: faker.internet.email() }));

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: users });
  const newUsers = await prisma.user.findMany();
  console.log('Seeded users', newUsers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
