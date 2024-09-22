import { z } from 'zod';

export const postProductBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  quantity: z.string().min(1),
  userId: z.string().min(1),
  category: z.string().min(1),
});

export const getProductQuery = z.object({
  category: z.string().min(1).optional(),
  sortBy: z.enum(['createdAt', 'price', 'name']).optional(),
});

export const putProductBodySchema = postProductBodySchema.optional();
