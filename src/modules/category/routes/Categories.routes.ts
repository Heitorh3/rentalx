import { Router } from 'express';

import { CreateCategoryController } from '@useCases/createCategories/CreateCategoryController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

export { categoriesRoutes };
