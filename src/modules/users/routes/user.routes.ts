import { Router } from 'express';

import { CreateUserController } from '@useCases/createUsers/CreateUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.handle);

export { usersRouter };
