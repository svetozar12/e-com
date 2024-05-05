import { Router } from 'express';
import { authRouter } from './auth/auth.route';
import { userRouter } from './user/user.route';
import { productRouter } from './product/product.route';
import { cartRouter } from './cart/cart.route';
import { categoryRouter } from './category/category.route';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/product', productRouter);
appRouter.use('/cart', cartRouter);
appRouter.use('/category', categoryRouter);
