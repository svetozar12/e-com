import { z } from 'zod';

export const searchQuerySchema = z.object({
  searchText: z.string().min(1),
});
