import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import Cart from '../../database/models/Cart.model';
import { StatusCodes } from 'http-status-codes';
import { CART_NOT_FOUND } from './cart.constants';
import { putCartBodySchema } from './cart.schema';

export const cartRouter = Router();

// Middleware
cartRouter.use(authMiddleware);

cartRouter.get('/', async (req, res) => {
  const user = req.user;
  console.log(user);
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    return res.json({ message: CART_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }
  return res.json({ cart });
});

cartRouter.put('/', async (req, res) => {
  const user = req.user;
  const { products } = putCartBodySchema.parse(req.body);
  const cart = await Cart.findOneAndUpdate(
    { userId: user._id },
    {
      $addToSet: {
        products: { $each: products }, // Ensure products are added without duplicates
      },
    },
    { new: true } // Return the updated document
  );
  if (!cart) {
    return res.json({ message: CART_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }

  return res.json({ cart });
});
