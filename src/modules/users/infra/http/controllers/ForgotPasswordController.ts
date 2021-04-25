import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendEmailForgotPasswordUseCase } from '@modules/users/services/forgotPassword/SendEmailForgotPasswordUseCase';

class ForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const email = request.body;

    const sendEmailForgotPassword = container.resolve(
      SendEmailForgotPasswordUseCase,
    );

    sendEmailForgotPassword.execute(email);

    return response.status(204).json();
  }
}
export default new ForgotPasswordController();
