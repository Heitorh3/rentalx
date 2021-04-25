import { Router } from 'express';

import { categoriesRoutes } from '@modules/category/infra/http/routes/categories.routes';
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes';
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/session.routes';
import { usersRouter } from '@modules/users/infra/http/routes/user.routes';

const v1Router = Router();

v1Router.use('/categories', categoriesRoutes);
v1Router.use('/users', usersRouter);
v1Router.use('/profile', profileRouter);
v1Router.use('/sessions', sessionsRouter);
v1Router.use('/password', passwordRouter);

export default v1Router;
