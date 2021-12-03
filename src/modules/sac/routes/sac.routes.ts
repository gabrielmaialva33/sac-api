import { Router } from 'express';

import { createSac, getSacList } from '../controllers/SacController';
import {
  createSacCategory,
  getSacCategories
} from '../controllers/CategoryController';

const routes = Router();

routes.post('/sac/categories/create', createSacCategory);
routes.get('/sac/categories', getSacCategories);

routes.post('/sac/create', createSac);
routes.get('/sac/list', getSacList);

export default routes;
