import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/users/services/authenticate/authenticateUseCase';
import { classToClass } from 'class-transformer';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const autenticateUser = container.resolve(AuthenticateUserUseCase);

    const { user, access_token, refresh_token } = await autenticateUser.execute({
      cpf,
      password,
    });

    return response.json({
      user: classToClass(user), access_token, refresh_token
    });
  }
}

export default new SessionsController();
