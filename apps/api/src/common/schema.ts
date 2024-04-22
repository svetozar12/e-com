import { z } from 'zod';

export const emailSchema = z.string().email({ message: 'Invalid email' });
export const idSchema = z.object({ id: z.string().min(1) });
