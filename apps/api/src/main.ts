/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import GmailTransporter from './utils/mail.util';
import { appRouter } from './routes';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middleware/error.middleware';
import { initEnv } from './utils/env.utils';
import { connectMongo } from './utils/mongo.utils';

const app = express();
// global instances
export const envs = initEnv();
export const gmailTransporter = new GmailTransporter();

connectMongo();

app.use(bodyParser.urlencoded());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/api', appRouter);
app.use(errorMiddleware);

const port = envs.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
