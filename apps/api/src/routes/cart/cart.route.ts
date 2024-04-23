import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import Cart from '../../models/Cart.model';
import { StatusCodes } from 'http-status-codes';
import { CART_NOT_FOUND } from '../../constants/cart.constants';
import { putCartBodySchema } from './cart.schema';

export const cartRouter = Router();

// Middleware
cartRouter.use(authMiddleware);

cartRouter.get('/cart', async (req, res) => {
  const user = req.user;
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    return res.json({ message: CART_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }
  return res.json({ cart });
});

cartRouter.put('/cart', async (req, res) => {
  const user = req.user;
  const { products } = putCartBodySchema.parse(req.body);
  const cart = await Cart.findOneAndUpdate({ userId: user._id, products });
  if (!cart) {
    return res.json({ message: CART_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }

  return res.json({ cart });
});
