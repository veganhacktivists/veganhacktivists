import prisma from 'lib/db/prisma';

import type { getUserSchema, updateUserSchema } from './schemas';
import type { z } from 'zod';

type UserId = z.infer<typeof getUserSchema>['id'];

export const updateUser = async (
  id: UserId,
  user: z.infer<typeof updateUserSchema>
) => {
  return await prisma.user.update({
    where: { id },
    data: user,
  });
};

export const getUser = async (id: UserId) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
