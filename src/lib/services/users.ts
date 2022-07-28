import { z } from 'zod';

import prisma from 'lib/db/prisma';

import type { User } from '@prisma/client';

export const getUserSchema = z.object({
  id: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1),
});

export const updateUser = async (
  id: User['id'],
  user: z.infer<typeof updateUserSchema>
) => {
  return await prisma.user.update({
    where: { id },
    data: user,
  });
};

export const getUser = (id: User['id']) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
