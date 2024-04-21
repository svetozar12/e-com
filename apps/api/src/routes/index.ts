import { Router } from 'express';
import { authRouter } from './auth/auth.route';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
