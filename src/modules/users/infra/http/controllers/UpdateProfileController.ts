import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProfileUseCase } from '../../../services/updateProfile/UpdateProfileUseCase';

class UpdateProfileController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const updateProfileUseCase = container.resolve(UpdateProfileUseCase)

    const { name, email, password, old_password } = request.body;

    try {
      await updateProfileUseCase.execute({ user_id, name, email, password, old_password });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
export { UpdateProfileController }
