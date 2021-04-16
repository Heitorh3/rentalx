import { Router, Request, Response } from 'express';

import createCategorieController from '@useCases/createCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategorieController().handle(request, response);
});

export { categoriesRoutes };
