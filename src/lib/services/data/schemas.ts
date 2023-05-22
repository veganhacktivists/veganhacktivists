import { z } from 'zod';

export const getDataDashboardProjectByIdSchema = z.string().cuid();
