import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import SessionController from '../controllers/SessionsController';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  SessionController.create,
);

export { sessionsRouter };
