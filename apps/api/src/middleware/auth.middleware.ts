import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../main';
import { IUser } from '../database/models/User.model';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const { JWT_SECRET } = envs;

  if (token == null)
    return res.status(401).json({ message: 'You are unauthorized.' });
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      console.log(err);
      req.user = null;
      return res.status(403).json({ message: 'You are forbidden.' });
    }
    req.user = data as IUser;
    next();
  });
}
