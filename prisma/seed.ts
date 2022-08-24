/* eslint-disable no-console */
import {
  PlaygroundRequestCategory,
  PrismaClient,
  Status,
  TimePerWeek,
} from '@prisma/client';

import { faker } from '@faker-js/faker';

import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const NUMBER = 50;

const seedUsers = async (n: number = NUMBER) => {
  const users: Prisma.UserCreateManyInput[] = Array(n)
    .fill(null)
    .map(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const name = faker.name.findName(firstName, lastName);

      return {
        email: faker.internet.email(firstName, lastName),
        name,
      };
    });
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
        name: faker.name.findName(),
        calendlyUrl: faker.internet.url(),
        category: faker.helpers.objectValue(PlaygroundRequestCategory),
        estimatedTimeDays: faker.datatype.number({ min: 1, max: 30 }),
        description: `${faker.hacker.phrase()} ${faker.lorem.paragraphs(
          faker.datatype.number(5)
        )}`,
        dueDate: faker.date.future(),
        isFree: faker.datatype.boolean(),
        requiredSkills: faker.helpers.uniqueArray(
          () => faker.hacker.ingverb(),
          faker.datatype.number({ min: 0, max: 10 })
        ),
        website: faker.internet.url(),
        title: faker.hacker.phrase().slice(0, 55),
        requesterId: faker.helpers.arrayElement(users).id,
        phone: faker.phone.number(),
        organization: faker.company.companyName(),
        createdAt: faker.date.recent(14),
        status: faker.helpers.objectValue(Status),
        providedEmail: faker.internet.email(),
      };
    });
  const { count } = await prisma.playgroundRequest.createMany({
    data: requests,
  });
  console.log('Seeded', count, 'requests');
};

const seedApplications = async (n: number = NUMBER) => {
  const [users, requests] = await Promise.all([
    prisma.user.findMany(),
    prisma.playgroundRequest.findMany(),
  ]);

  const applications: Prisma.PlaygroundApplicationCreateManyInput[] =
    requests.flatMap((request) =>
      Array(faker.datatype.number({ min: 0, max: n }))
        .fill(null)
        .map(() => {
          const user = faker.helpers.arrayElement(users);
          return {
            createdAt: faker.date.soon(2, request.createdAt),
            applicantId: user.id,
            availableTimePerWeek: faker.helpers.objectValue(TimePerWeek),
            requestId: request.id,
            hasAppliedInThePast: faker.datatype.boolean(),
            isVegan: faker.datatype.boolean(),
            name: user.name || faker.name.findName(),
            providedEmail: user.email,
            status: faker.helpers.objectValue(Status),
            calendlyUrl: faker.internet.url(),
            instagramUrl:
              (faker.datatype.boolean() ? '@' : '') +
              faker.internet.userName(user.name || undefined),
            linkedinUrl: faker.internet.userName(user.name || undefined),
            portfolioLink: faker.internet.url(),
            twitterUrl:
              (faker.datatype.boolean() ? '@' : '') +
              faker.internet.userName(user.name || undefined),
            moreInfo: faker.lorem.paragraphs(faker.datatype.number(5)),
          } as Prisma.PlaygroundApplicationCreateManyInput;
        })
    );

  const { count } = await prisma.playgroundApplication.createMany({
    data: applications,
    skipDuplicates: true,
  });
  console.log('Seeded', count, 'applications');
};

const cleanup = async () => {
  await prisma.discordMessage.deleteMany();
  await prisma.playgroundApplication.deleteMany();
  await prisma.playgroundRequest.deleteMany();
  await prisma.user.deleteMany({
    where: {
      emailVerified: null,
    },
  });
};

async function main() {
  await cleanup();
  await seedUsers();
  await seedRequests();
  await seedApplications(NUMBER / 10);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
