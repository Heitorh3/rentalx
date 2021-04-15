import { Router, Request, Response } from 'express';

import { CreateCategorieController } from '@useCases/createCategorys/CreateCategoryController';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return CreateCategorieController.handle(request, response);
});

export { categoriesRoutes };
