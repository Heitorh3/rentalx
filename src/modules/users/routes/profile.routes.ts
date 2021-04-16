import { Router } from 'express';

import { UpdateProfileController } from '@useCases/updateProfile/UpdateProfileController';

const profileRouter = Router();

const updateProfileController = new UpdateProfileController();

profileRouter.post('/', updateProfileController.handle);

export { profileRouter };
