import { z } from 'zod';

export const cartProductBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
  image: z.string().min(1),
});

export const putCartBodySchema = z.object({
  products: z.array(cartProductBodySchema).optional(),
  deleteProducts: z.array(z.string()).optional(),
});
