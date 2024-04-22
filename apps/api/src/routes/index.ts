import { Router } from 'express';
import { authRouter } from './auth/auth.route';
import { userRouter } from './user/user.route';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
