import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { searchQuerySchema } from './search.schema';
import Product from '../../database/models/Product.model';
import User from '../../database/models/User.model';

export const searchRouter = Router();

// Middleware
searchRouter.use(authMiddleware);

searchRouter.get('/product', (req, res) => {
  const { searchText } = searchQuerySchema.parse(req.query);
  const products = Product.find({ name: new RegExp(searchText, 'i') });

  return res.json({ products });
});

searchRouter.get('/user', (req, res) => {
  const { searchText } = searchQuerySchema.parse(req.query);
  const users = User.find({ name: new RegExp(searchText, 'i') });

  return res.json({ users });
});
