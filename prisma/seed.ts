/* eslint-disable no-console */
import type { Post, User, Vote } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const USER_NUMBER = 50;
const POST_NUMBER = 10;
const MAX_VOTES_PER_POST = 20;

type SkipableFields = 'createdAt' | 'updatedAt' | 'id';

const users: Pick<User, 'email'>[] = Array(USER_NUMBER)
  .fill(null)
  .map(() => ({ email: faker.internet.email() }));

const posts: Omit<Post, SkipableFields | 'userId'>[] = Array(POST_NUMBER)
  .fill(null)
  .map(() => ({
    title: faker.hacker.phrase(),
    body: faker.lorem.paragraph(),
  }));

async function main() {
  await prisma.vote.deleteMany();
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

  newPosts.forEach(async (post) => {
    const votingUserIds = faker.helpers.shuffle(
      newUsers.map((user) => user.id)
    );
    const numberOfVotes = Math.min(
      votingUserIds.length,
      Math.ceil(Math.random() * MAX_VOTES_PER_POST)
    );

    const votes: Omit<Vote, SkipableFields>[] = Array(numberOfVotes)
      .fill(null)
      .map((_, i) => ({
        userId: votingUserIds[i],
        postId: post.id,
        isUpvote: Math.random() > 0.5,
      }));

    const { count } = await prisma.vote.createMany({ data: votes });
    console.log(`Created ${count} votes for post`, post.id);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
