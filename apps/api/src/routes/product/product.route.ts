import { Router } from 'express';
import { idSchema } from '../../common/schema';
import Product from '../../models/Product.model';
import { PRODUCT_NOT_FOUND } from '../../constants/product.constants';
import { StatusCodes } from 'http-status-codes';
import { postProductBodySchema, putProductBodySchema } from './product.schema';

export const productRouter = Router();

productRouter.get('/product', async (req, res) => {
  const productList = await Product.find({ userId: req.user._id });
  return res.json({ data: productList });
});

productRouter.get('/product/:id', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const product = await Product.findById(id).lean();
  if (!product) {
    return res
      .json({ message: PRODUCT_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ product });
});

productRouter.post('/product', async (req, res) => {
  const body = postProductBodySchema.parse(req.body);
  const product = await Product.create(body);

  return res.json({ product });
});

productRouter.put('/product/:id', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const body = putProductBodySchema.parse(req.body);
  const product = await Product.findByIdAndUpdate(id, body);
  if (!product) {
    return res
      .json({ message: PRODUCT_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ product });
});

productRouter.delete('/product/:id', (req, res) => {
  const { id } = idSchema.parse(req.params);
  return res.json({});
});
