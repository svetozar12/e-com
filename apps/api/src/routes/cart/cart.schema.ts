import { z } from 'zod';

export const putCartBodySchema = z.object({ products: z.array(z.string()) });
