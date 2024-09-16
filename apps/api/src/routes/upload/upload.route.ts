import { Router } from 'express';
import express from 'express';
import path from 'path';

export const uploadRouter = Router();

uploadRouter.use(
  '/static',
  express.static(path.resolve(__dirname, '..', 'uploads'))
);
