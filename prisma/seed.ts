/* eslint-disable no-console */
import type { Post, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users: Pick<User, 'email'>[] = Array(10)
  .fill(null)
  .map(() => ({ email: faker.internet.email() }));

const posts: Pick<Post, 'title' | 'body'>[] = Array(10)
  .fill(null)
  .map(() => ({
    title: faker.hacker.phrase(),
    body: faker.lorem.paragraph(),
  }));

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: users });
  const newUsers = await prisma.user.findMany();
  console.log('Created users', newUsers);

  await prisma.post.createMany({
    data: posts.map((post) => ({
      ...post,
      userId: faker.helpers.arrayElement(newUsers).id,
    })),
  });
  const newPosts = await prisma.post.findMany();
  console.log('Created posts', newPosts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
