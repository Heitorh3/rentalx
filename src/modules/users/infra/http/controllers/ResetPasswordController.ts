import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUseCase } from '@modules/users/services/resetPassword/ResetPasswordUseCase';

class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    resetPasswordUseCase.execute({ token, password });
    return response.status(204).json();
  }
}

export default new ResetPasswordController();
