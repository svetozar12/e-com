import { Router } from 'express';
import { idSchema, paginationSchema } from '../../common/schema';
import Product, { IProduct } from '../../database/models/Product.model';
import { PRODUCT_DELETED, PRODUCT_NOT_FOUND } from './product.constants';
import { StatusCodes } from 'http-status-codes';
import {
  getProductQuery,
  postProductBodySchema,
  putProductBodySchema,
} from './product.schema';
import {
  paginateResults,
  PaginationResults,
} from '../../utils/pagination.utils';

export const productRouter = Router();

productRouter.get('/', async (req, res) => {
  const { limit, page } = paginationSchema.parse(req.query);
  const { categoryId } = getProductQuery.parse(req.query);

  const results: PaginationResults<IProduct> = await paginateResults(
    Product,
    { category: categoryId, userId: req.user._id },
    page,
    limit
  );
  return res.json(results);
});

productRouter.get('/:id', async (req, res) => {
  const { categoryId } = getProductQuery.parse(req.query);
  const { id } = idSchema.parse(req.params);
  const user = req.user;
  const product = await Product.findOne({
    _id: id,
    userId: user.id,
    category: categoryId,
  }).lean();
  if (!product) {
    return res
      .json({ message: PRODUCT_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ product });
});

productRouter.post('/', async (req, res) => {
  const body = postProductBodySchema.parse(req.body);
  const product = await Product.create(body);

  return res.json({ product });
});

productRouter.put('/:id', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const body = putProductBodySchema.parse(req.body);
  const product = await Product.findOneAndUpdate({
    _id: id,
    ...body,
  });
  if (!product) {
    return res
      .json({ message: PRODUCT_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ product });
});

productRouter.delete('/:id', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const user = req.user;
  const product = await Product.findOneAndDelete({
    _id: id,
    userId: user.id,
  }).lean();
  if (!product) {
    return res
      .json({ message: PRODUCT_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ message: PRODUCT_DELETED });
});
