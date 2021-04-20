import { classToClass } from 'class-transformer';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '../../../services/createUsers/CreateUserUseCase';

export class CreateUserController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase)

    try {
      const user = await createUserUseCase.execute({ name, email, cpf, password });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
