import { Router } from 'express';
import { authRouter } from './auth/auth.route';
import { userRouter } from './user/user.route';
import { productRouter } from './product/product.route';
import { cartRouter } from './cart/cart.route';
import { uploadRouter } from './upload/upload.route';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/products', productRouter);
appRouter.use('/cart', cartRouter);
appRouter.use('/upload', uploadRouter);
