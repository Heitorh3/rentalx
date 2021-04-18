import { Router } from 'express';

import { UpdateProfileController } from '@modules/users/services/updateProfile/UpdateProfileController';

const profileRouter = Router();

const updateProfileController = new UpdateProfileController();

profileRouter.post('/', updateProfileController.handle);

export { profileRouter };
