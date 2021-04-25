import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from '../../../services/createCategories/CreateCategoryUseCase';

export class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const { name, description } = request.body;

    try {
      await createCategoryUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
