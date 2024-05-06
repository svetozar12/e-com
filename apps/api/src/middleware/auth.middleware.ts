import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../main';
import { IUser } from '../models/User.model';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const { JWT_SECRET } = envs;

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      req.user = null;
      return res.sendStatus(403);
    }
    req.user = data as IUser;
    next();
  });
}
