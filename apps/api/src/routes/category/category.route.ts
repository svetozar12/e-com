import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import Category, { ICategory } from '../../database/models/Category.model';
import { idSchema, paginationSchema } from '../../common/schema';
import { CATEGORY_NOT_FOUND } from './category.constants';
import { StatusCodes } from 'http-status-codes';

import {
  PaginationResults,
  paginateResults,
} from '../../utils/pagination.utils';

export const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
  try {
    const { limit, page } = paginationSchema.parse(req.query);
    const results: PaginationResults<ICategory> = await paginateResults(
      Category,
      null,
      page,
      limit
    );
    return res.json(results);
  } catch (error) {
    console.log(error, 'data');
    return res.json(error);
  }
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
