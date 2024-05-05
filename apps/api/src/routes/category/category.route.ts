import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import Category from '../../models/Category.model';
import { idSchema } from '../../common/schema';
import { CATEGORY_NOT_FOUND } from './category.constants';
import { StatusCodes } from 'http-status-codes';

export const categoryRouter = Router();

// Middleware
categoryRouter.use(authMiddleware);

categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find().lean();
  return res.json({ categories });
});

categoryRouter.get('/:id', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const category = await Category.findById(id).lean();
  if (!category) {
    return res
      .json({ message: CATEGORY_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  return res.json({ category });
});

categoryRouter.get('/:id/subCategories', async (req, res) => {
  const { id } = idSchema.parse(req.params);
  const category = await Category.findById(id).lean();
  if (!category) {
    return res
      .json({ message: CATEGORY_NOT_FOUND })
      .status(StatusCodes.NOT_FOUND);
  }
  const { subcategories } = category;
  return res.json({ subcategories });
});
