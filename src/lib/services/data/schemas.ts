import { z } from 'zod';

export const getDataDashboardProjectByIdSchema = z.optional(z.string().cuid());
