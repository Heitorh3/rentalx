import { Router } from 'express';

import { categoriesRoutes } from '@modules/category/routes/Categories.routes'
import { usersRoutes } from '@modules/users/routes/User.routes';

const v1Router = Router();

v1Router.use('/categories', categoriesRoutes);
v1Router.use('/users', usersRoutes)

export default v1Router;
