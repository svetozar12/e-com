import { z } from 'zod';

export const emailSchema = z.string().email({ message: 'Invalid email' });
export const idSchema = z.object({ id: z.string().min(1) });
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
