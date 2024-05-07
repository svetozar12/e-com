import { Router } from 'express';
import User from '../../database/models/User.model';
import { USER_DELETED, USER_NOT_FOUND } from './user.constatns';
import { StatusCodes } from 'http-status-codes';
import { authMiddleware } from '../../middleware/auth.middleware';

export const userRouter = Router();

// Middleware
userRouter.use(authMiddleware);

userRouter.get('/', async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).lean();
  if (!user) {
    return res.json({ message: USER_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }
  return res.json({ user });
});

userRouter.delete('/', async (req, res) => {
  const { id } = req.user;
  const user = await User.findByIdAndDelete(id).lean();
  if (!user) {
    return res.json({ message: USER_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }
  return res.json({ message: USER_DELETED }).status(StatusCodes.CREATED);
});
