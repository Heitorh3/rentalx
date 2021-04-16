import { Router } from 'express';

import { categoriesRoutes } from '../modules/category/routes/Categories.routes'

const v1Router = Router();

v1Router.use('/categories', categoriesRoutes);

export default v1Router;
