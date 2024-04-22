import { Router } from 'express';
import { idSchema } from '../../common/schema';
import User from '../../models/User.model';
import { USER_DELETED, USER_NOT_FOUND } from '../../constants/user.constatns';
import { StatusCodes } from 'http-status-codes';

export const userRouter = Router();

userRouter.get('/user/:id', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const user = await User.findById(id).lean();
  if (!user) {
    return res.json({ message: USER_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }
  return res.json({ user });
});

userRouter.delete('/user/:id', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const user = await User.findByIdAndDelete(id).lean();
  if (!user) {
    return res.json({ message: USER_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }
  return res.json({ message: USER_DELETED }).status(StatusCodes.CREATED);
});
