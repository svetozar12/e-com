import { z } from 'zod';

export const emailSchema = z.string().email({ message: 'Invalid email' });
export const idSchema = z.object({ id: z.string().min(1) });
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const fileSchema = z.object({
  mimetype: z.string().refine(
    (val) => {
      return ['image/png', 'image/jpeg'].includes(val); // Allow only png and jpeg
    },
    {
      message: 'Invalid file type. Only PNG and JPEG are allowed.',
    }
  ),
  size: z.number().max(1024 * 1024 * 5, 'File size too large, max 5MB'), // Limit size to 5MB
});
