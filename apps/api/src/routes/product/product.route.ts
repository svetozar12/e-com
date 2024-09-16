import { Router } from 'express';
import { fileSchema, idSchema, paginationSchema } from '../../common/schema';
import Product, { IProduct } from '../../database/models/Product.model';
import { PRODUCT_DELETED, PRODUCT_NOT_FOUND } from './product.constants';
import { StatusCodes } from 'http-status-codes';
import {
  getProductQuery,
  postProductBodySchema,
  putProductBodySchema,
} from './product.schema';
import { authMiddleware } from '../../middleware/auth.middleware';
import {
  paginateResults,
  PaginationResults,
} from '../../utils/pagination.utils';
import { upload } from '../../utils/multer';

export const productRouter = Router();

productRouter.get('/', async (req, res) => {
  const { limit, page } = paginationSchema.parse(req.query);
  const { category, sortBy } = getProductQuery.parse(req.query);

  const results: PaginationResults<IProduct> = await paginateResults(
    Product,
    { ...(category && { category }) },
    page,
    limit,
    sortBy
  );
  return res.json(results);
});

productRouter.get('/:id', async (req, res) => {
  const { category } = getProductQuery.parse(req.query);
  const { id } = idSchema.parse(req.params);
  const product = await Product.findOne({
    _id: id,
    category,
  }).lean();
  if (!product) {
    return res
      .json({ message: PRODUCT_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ product });
});

productRouter.post(
  '/',
  authMiddleware,
  upload.single('file'),
  async (req, res) => {
    const file = req.file;
    const validationResult = fileSchema.safeParse({
      mimetype: file.mimetype,
      size: file.size,
    });

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult });
    }

    const body = postProductBodySchema.parse(req.body);
    const product = await Product.create({ ...body, image: file.filename });

    return res.json({ product });
  }
);

productRouter.put('/:id', authMiddleware, async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const body = putProductBodySchema.parse(req.body);
  const user = req.user;
  const product = await Product.findOneAndUpdate({
    _id: id,
    user: user.id,
    ...body,
  });
  if (!product) {
    return res
      .json({ message: PRODUCT_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ product });
});

productRouter.delete('/:id', authMiddleware, async (req, res) => {
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
