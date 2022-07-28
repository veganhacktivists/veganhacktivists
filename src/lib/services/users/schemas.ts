import { z } from 'zod';

export const getUserSchema = z.object({
  id: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1),
});
