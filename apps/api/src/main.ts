/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import GmailTransporter from './utils/mail.util';
import { appRouter } from './routes';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/error.middleware';
import { initEnv } from './utils/env.utils';
const app = express();
export const envs = initEnv();
export const gmailTransporter = new GmailTransporter();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', appRouter);
// Register the error handler middleware
app.use(errorHandler);
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
