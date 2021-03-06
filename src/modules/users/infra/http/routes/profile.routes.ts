import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/EnsureAuthenticated';

import { UpdateProfileController } from '@modules/users/infra/http/controllers/UpdateProfileController';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

const updateProfileController = new UpdateProfileController();

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      cpf: Joi.string().required().min(11).max(11),
      password: Joi.string(),
      old_password: Joi.string().when('password', {
        then: Joi.string().required(),
      }),
      password_confirmation: Joi.string().when('password', {
        then: Joi.string().required(),
      }),
    },
  }),
  updateProfileController.handle,
);

export { profileRouter };
