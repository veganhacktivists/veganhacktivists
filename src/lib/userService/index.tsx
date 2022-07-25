import prisma from 'lib/db/prisma';

import type { User } from '@prisma/client';

export const updateUser: (
  id: User['id'],
  user: Partial<User>
) => Promise<User> = (id, user) => {
  return prisma.user.update({
    where: { id },
    data: user,
  });
};

export const getUser: (id: User['id']) => Promise<User | null> = (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
