/* eslint-disable no-console */
import {
  PlaygroundRequestCategory,
  Priority,
  PrismaClient,
} from '@prisma/client';

import { faker } from '@faker-js/faker';

import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const NUMBER = 50;

const seedUsers = async (n: number = NUMBER) => {
  const users: Prisma.UserCreateManyInput[] = Array(n)
    .fill(null)
    .map(() => ({
      email: faker.internet.email(),
      name: faker.name.findName(),
    }));
  const { count } = await prisma.user.createMany({ data: users });
  console.log('Seeded', count, 'users');
};

const seedRequests = async (n: number = NUMBER) => {
  const users = await prisma.user.findMany();
  const requests: Prisma.PlaygroundRequestCreateManyInput[] = Array(n)
    .fill(null)
    .map(() => {
      return {
        budget: faker.datatype.boolean()
          ? faker.datatype.float({
              min: 10,
              max: 10000,
              precision: faker.helpers.arrayElement([0.01, 0.1]),
            })
          : faker.datatype.number({ min: 10, max: 10000 }),
        category: faker.helpers.objectValue(PlaygroundRequestCategory),
        estimatedTimeDays: faker.datatype.number({ min: 1, max: 30 }),
        description:
          faker.hacker.phrase() +
          faker.lorem.paragraphs(faker.datatype.number(5)),
        dueDate: faker.date.future(),
        free: faker.datatype.boolean(),
        priority: faker.helpers.objectValue(Priority),
        roleTitle: faker.hacker.noun(),
        requiredSkills: faker.helpers.uniqueArray(
          () => faker.hacker.ingverb(),
          faker.datatype.number({ min: 0, max: 10 })
        ),
        website: faker.internet.url(),
        title: faker.hacker.phrase(),
        requesterId: faker.helpers.arrayElement(users).id,
        phone: faker.phone.number(),
        organization: faker.company.companyName(),
        createdAt: faker.date.recent(14),
        isApproved: faker.datatype.boolean(),
      };
    });
  const { count } = await prisma.playgroundRequest.createMany({
    data: requests,
  });
  console.log('Seeded', count, 'requests');
};

const cleanup = async () => {
  await prisma.playgroundRequest.deleteMany();
  await prisma.user.deleteMany();
};

async function main() {
  await cleanup();
  await seedUsers();
  await seedRequests();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
