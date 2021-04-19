import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/users/services/authenticate/authenticateUseCase';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const autenticateUser = container.resolve(AuthenticateUserUseCase);

    const { user, token } = await autenticateUser.execute({
      cpf,
      password,
    });

    return response.json({
      user: {
        name: user.name,
        email: user.email,
      }, token
    });
  }
}

export default new SessionsController();
