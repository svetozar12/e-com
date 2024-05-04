import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';

export const categoryRouter = Router();

// Middleware
categoryRouter.use(authMiddleware);

categoryRouter.get('/', (req, res) => {
  return res.json();
});
