import { injectable, inject } from 'tsyringe';

import { ICreateCategoryUseCase } from './ICreateCategoryUseCase';

import { ICreateCategoryRequestDTO } from './ICreateCategoryRequestDTO';
import { Category } from 'modules/entities/category/Category';
import { ICategorysRepository } from '@repositories/implementations/categories/ICategorysRepository';

import LoggerProvider from "@shared/container/providers/LoggerProvider/models/LoggerProvider";

@injectable()
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(

    @inject('CategoryRepository')
    private categorysRepository: ICategorysRepository,

    @inject('LoggerProvider')
    private loggerProvider: LoggerProvider,
  ) { }

  async execute(data: ICreateCategoryRequestDTO): Promise<void> {
    const categoryAlreadyExists = await this.categorysRepository.findByName(
      data.name,
    );

    if (categoryAlreadyExists) {
      throw new Error('Category already exists.');
    }

    const category = new Category(data);

    this.loggerProvider.log('info', `Catergory [${category.name}] added to database`, {
      messageID: category.id,
    });

    await this.categorysRepository.save(category);
  }
}
