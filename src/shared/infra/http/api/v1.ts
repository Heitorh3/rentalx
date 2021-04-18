import { Router } from 'express';

import { categoriesRoutes } from '@modules/category/routes/Categories.routes'
import { usersRouter } from '@modules/users/infra/http/routes/user.routes';
import { profileRouter } from "@modules/users/infra/http/routes/profile.routes";

const v1Router = Router();

v1Router.use('/categories', categoriesRoutes);
v1Router.use('/users', usersRouter)
v1Router.use('/profile', profileRouter);

export default v1Router;
