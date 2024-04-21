import { z } from 'zod';
import { emailSchema } from '../common/schema';
import dotenv from 'dotenv';

export function initEnv() {
  dotenv.config();
  const schema = z.object({
    PORT: z.string().min(1).default('3333'),
    DB_URL: z.string().url(),
    GMAIL_EMAIL: emailSchema,
    GMAIL_PASSWORD: z.string(),
  });
  // Validate environment variables against the schema
  return schema.parse(process.env);
}
