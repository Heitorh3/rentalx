import { Router } from 'express';

import { CreateCategoryController } from '@modules/category/infra/http/controllers/CreateCategoryController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

export { categoriesRoutes };
