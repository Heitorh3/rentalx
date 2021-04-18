import { Router } from 'express';

import { CreateCategoryController } from '@modules/category/services/createCategories/CreateCategoryController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

export { categoriesRoutes };
