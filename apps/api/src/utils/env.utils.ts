import { z } from 'zod';
import { emailSchema } from '../common/schema';
import dotenv from 'dotenv';

const NodeEnv = z.enum(['development', 'test', 'production']);

export function initEnv() {
  dotenv.config();
  const schema = z.object({
    PORT: z.string().min(1).default('3333'),
    DB_URL: z.string().url().default('mongodb://localhost:27017'),
    GMAIL_EMAIL: emailSchema,
    GMAIL_PASSWORD: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    NODE_ENV: NodeEnv.default('development'),
  });
  // Validate environment variables against the schema
  return schema.parse(process.env);
}
