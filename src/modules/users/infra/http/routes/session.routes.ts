import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import SessionController from '../controllers/SessionsController';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required().min(11).max(11),
      password: Joi.string().required(),
    },
  }),
  SessionController.create,
);

export { sessionsRouter };
