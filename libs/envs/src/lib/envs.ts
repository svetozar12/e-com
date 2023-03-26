import { cleanEnv, str } from 'envalid';

export const envVars = cleanEnv(process.env, {
  EMAIL_CONFIG_JSON: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
});
