import { cleanEnv, str, num } from 'envalid';

export const authorEnvs = () =>
  cleanEnv(process.env, {
    AUTHOR_SERVICE_MONGO_URL: str({ default: undefined }),
    AUTHOR_SERVICE_HOST: str(),
    AUTHOR_SERVICE_PORT: num(),
  });
