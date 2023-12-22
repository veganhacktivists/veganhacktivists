/* eslint-disable no-console */
import {
  BudgetType,
  PlaygroundRequestCategory,
  PrismaClient,
  RequestStatus,
  ApplicationStatus,
  TimePerWeek,
  PlaygroundRequestDesignRequestType,
  UserRole,
  OrganizationType,
  Origin,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const NUMBER = 50;

const seedUsers = async (n: number = NUMBER) => {
  const users: Prisma.UserCreateManyInput[] = await Promise.all(Array(n)
    .fill(null)
    .map(async() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const name = faker.name.fullName({ firstName, lastName });
      const requestor = faker.datatype.boolean();

      let organization = null;
      if (requestor) {
         organization = await prisma.organization.create({
          data: {
            name: faker.company.companyName(),
            website: faker.internet.url(),
            description: faker.lorem.paragraphs(faker.datatype.number(5)),
            type: faker.helpers.objectValue(OrganizationType),
          },
        });
      }
      return {
        role: requestor
          ? UserRole.Requestor
          : UserRole.Applicant,
        email: faker.internet.email(firstName, lastName),
        name,
        organizationId: organization?.id,
      };
    }));

  const { count } = await prisma.user.createMany({ data: users });
  console.log('Seeded', count, 'users');
};

const seedProfileDetails = async () => {
  const possibleRequestors = await prisma.user.findMany({
    where: { role: UserRole.Requestor },
  });
  const possibleApplicants = await prisma.user.findMany({
    where: { role: UserRole.Applicant },
  });
  for(const user of possibleRequestors) {
    await prisma.requestorInformation.create({
      data: {
        userId: user.id,
        phone: faker.phone.phoneNumber(),
        contactLink: faker.internet.url(),
        contactEmail: faker.internet.email(),
      }
    });
  }
  for(const user of possibleApplicants) {
    await prisma.applicantInformation.create({
      data: {
        userId: user.id,
        contactLink: faker.internet.url(),
        contactEmail: faker.internet.email(),
        origin: faker.helpers.objectValue(Origin),
        website: faker.internet.url(),
        socialMedia: { twitter: faker.internet.url(), instagram: faker.internet.url(), facebook: faker.internet.url() },  
        availableTimePerWeek: faker.helpers.objectValue(TimePerWeek),
      }
    });
  }
}


const seedRequests = async (n: number = NUMBER) => {
  const possibleRequestors = await prisma.user.findMany({
    where: { role: UserRole.Requestor },
  });
  const requests: Prisma.PlaygroundRequestCreateArgs['data'][] = Array(n)
    .fill(null)
    .map(() => {
      const createdAt = faker.date.recent(14);
      const isFree = faker.datatype.boolean();
      const category = faker.helpers.objectValue(PlaygroundRequestCategory);
      const requestor = faker.helpers.arrayElement(possibleRequestors);
      return {
        budget: isFree
          ? undefined
          : {
              create: {
                quantity: faker.datatype.boolean()
                  ? faker.datatype.float({
                      min: 10,
                      max: 10000,
                      precision: faker.helpers.arrayElement([0.01, 0.1]),
                    })
                  : faker.datatype.number({ min: 10, max: 10000 }),
                type: faker.helpers.objectValue(BudgetType),
              },
            },
        category,
        description: `${faker.hacker.phrase()} ${faker.lorem.paragraphs(
          faker.datatype.number(5)
        )}`,
        dueDate:
          faker.datatype.number({ min: 0, max: 1 }) > 0.1
            ? faker.datatype.boolean()
              ? faker.datatype.boolean()
                ? faker.date.future(undefined, createdAt)
                : faker.date.soon(30, createdAt)
              : faker.datatype.boolean()
                ? faker.date.past(undefined, createdAt)
                : faker.date.recent(30, createdAt)
            : new Date(),
        requiredSkills: faker.helpers.uniqueArray(
          () => faker.hacker.ingverb(),
          faker.datatype.number({ min: 0, max: 10 })
        ),
        title: faker.hacker.phrase(),
        requesterId: requestor.id,
        organizationId: requestor.organizationId ?? '',
        createdAt,
        acceptedAt:
          faker.datatype.number({ min: 0, max: 1 }) > 0.5
            ? faker.date.recent(40)
            : undefined,
        status: faker.helpers.objectValue(RequestStatus),
        lastManuallyPushed:
          faker.datatype.number({ min: 0, max: 1 }) > 0.3
            ? faker.date.recent(30)
            : undefined,
        ...(category === 'Designer' && {
          designRequestCurrentDesignExists: faker.datatype.boolean(),
          designRequestType: faker.helpers.objectValue(
            PlaygroundRequestDesignRequestType
          ),
        }),
        ...(category === 'Developer' && {
          devRequestWebsiteUrl: faker.internet.url(),
        }),
      };
    });

  for await (const request of requests) {
    await prisma.playgroundRequest.create({
      data: request,
    });
  }

  console.log('Seeded', n, 'requests');
};

const seedApplications = async (n: number = NUMBER) => {
  const [possibleApplicants, requests] = await Promise.all([
    prisma.user.findMany({ where: { role: UserRole.Applicant } }),
    prisma.playgroundRequest.findMany(),
  ]);

  const applications: Prisma.PlaygroundApplicationCreateManyInput[] =
    requests.flatMap((request) =>
      Array(faker.datatype.number({ min: 0, max: n }))
        .fill(null)
        .map(() => {
          const user = faker.helpers.arrayElement(possibleApplicants);
          return {
            createdAt: faker.date.soon(2, request.createdAt),
            acceptedAt: faker.date.soon(2, request.createdAt),
            applicantId: user.id,
            requestId: request.id,
            status: faker.helpers.objectValue(ApplicationStatus),
            moreInfo: faker.datatype.boolean()
              ? faker.lorem.paragraphs(faker.datatype.number(5))
              : '',
          } as Prisma.PlaygroundApplicationCreateManyInput;
        })
    );

  const { count } = await prisma.playgroundApplication.createMany({
    data: applications,
    skipDuplicates: true,
  });
  console.log('Seeded', count, 'applications');
};

const seedDataDashboardProjects = async () => {
  const projects: string[] = [
    '5 minutes 5 vegans',
    'dominion.org',
    'vegans of reddit',
  ];
  const projectEntries: Prisma.DataDashboardProjectCreateManyInput[] =
    projects.map((project) => {
      return {
        label: project,
      };
    });
  const { count } = await prisma.dataDashboardProject.createMany({
    data: projectEntries,
  });
  console.log('Seeded', count, 'data-dashboard projects');
};

const seedDataDashboardData = async (n: number) => {
  const projects = await prisma.dataDashboardProject.findMany();
  let dataCounter = 0;
  for (const project of projects) {
    const dataList: { id: string }[] = [];
    for (let i = 0; i < n; i++) {
      const values: Prisma.DataDashboardValueCreateManyInput[] = [
        {
          key: 'clicks',
          value: faker.datatype.number({ min: 0, max: 200 }).toString(),
        },
        {
          key: 'comments',
          value: faker.datatype.number({ min: 0, max: 200 }).toString(),
        },
      ];
      const data: Prisma.DataDashboardDataCreateInput = {
        timestamp: new Date(
          DateTime.fromISO(faker.date.recent(365).toISOString()).toISODate()
        ),
        values: {
          createMany: {
            data: values,
          },
        },
      };
      const { id: dataId } = await prisma.dataDashboardData.create({
        data: data,
      });
      dataList.push({ id: dataId });
      dataCounter++;
    }
    await prisma.dataDashboardProject.update({
      where: {
        id: project.id,
      },
      data: {
        data: {
          connect: dataList,
        },
      },
    });
  }

  console.log('Seeded', dataCounter, 'data-dashboard data entries');
  console.log('Seeded', dataCounter * 2, 'data-dashboard data values');
};

const seedDataDashboard = async () => {
  await seedDataDashboardProjects();
  await seedDataDashboardData(20);
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
  await prisma.dataDashboardValue.deleteMany();
  await prisma.dataDashboardData.deleteMany();
  await prisma.dataDashboardProject.deleteMany();
};

async function main() {
  await cleanup();
  await seedUsers();
  await seedProfileDetails();
  await seedRequests();
  await seedApplications(NUMBER / 10);
  await seedDataDashboard();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
