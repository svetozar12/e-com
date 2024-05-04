import { z } from 'zod';

export const postProductBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
  userId: z.string().min(1),
});

export const getProductQuery = z.object({ categoryId: z.string().min(1) });

export const putProductBodySchema = postProductBodySchema.optional();
