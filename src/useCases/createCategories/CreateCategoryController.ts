import { Request, Response } from 'express';

import { injectable, inject } from 'tsyringe';

import { ICreateCategoryUseCase } from './ICreateCategoryUseCase';

@injectable()
export class CreateCategoryController {

  constructor(
    @inject('CreateCategoryUseCase')
    private createCategoryUseCase: ICreateCategoryUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      await this.createCategoryUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}

