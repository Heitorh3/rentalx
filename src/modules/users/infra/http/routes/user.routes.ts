import { Router } from 'express';

import { CreateUserController } from '@modules/users/infra/http/controllers/CreateUserController';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required().min(11).max(11),
    password: Joi.string().required()
  }
}), createUserController.handle);

export { usersRouter };
