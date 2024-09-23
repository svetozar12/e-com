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
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    return res.json({ message: CART_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }
  return res.json({ cart });
});

cartRouter.put('/', async (req, res) => {
  const user = req.user;
  const { products, deleteProducts } = putCartBodySchema.parse(req.body);

  let updateOperation;
  if (deleteProducts) {
    updateOperation = {
      $pull: { products: { _id: { $in: deleteProducts } } },
    };
  } else {
    updateOperation = {
      $addToSet: { products: { $each: products } },
    };
  }

  const cart = await Cart.findOneAndUpdate(
    { userId: user._id },
    updateOperation,
    { new: true }
  );
  if (!cart) {
    return res.json({ message: CART_NOT_FOUND }).status(StatusCodes.NOT_FOUND);
  }

  return res.json({ cart });
});
