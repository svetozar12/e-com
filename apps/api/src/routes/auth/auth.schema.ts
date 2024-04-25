import { z } from 'zod';
import { emailSchema } from '../../common/schema';

export const signUpBodySchema = z.object({ email: emailSchema });
export const verifyBodySchema = z.object({
  code: z.string().min(1),
  email: emailSchema,
});
