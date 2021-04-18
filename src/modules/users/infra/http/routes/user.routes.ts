import { Router } from 'express';

import { CreateUserController } from '@modules/users/infra/http/controllers/CreateUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.handle);

export { usersRouter };
