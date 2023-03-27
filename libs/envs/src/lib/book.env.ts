import { cleanEnv, str, num } from 'envalid';

export const bookEnvs = cleanEnv(process.env, {
  BOOK_SERVICE_MONGO_URL: str({ default: undefined }),
  BOOK_SERVICE_HOST: str(),
  BOOK_SERVICE_PORT: num(),
});
