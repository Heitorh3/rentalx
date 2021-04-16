
import { container } from 'tsyringe';

import './providers';

import { CategoryRepository } from '@repositories/implementations/categories/CategoryRepository';
import { ICategorysRepository } from '@repositories/implementations/categories/ICategorysRepository';

import { ICreateCategoryUseCase } from '@useCases/createCategories/ICreateCategoryUseCase'
import { CreateCategoryUseCase } from '@useCases/createCategories/CreateCategoryUseCase'

container.registerSingleton<ICreateCategoryUseCase>('CreateCategoryUseCase', CreateCategoryUseCase);

container.registerSingleton<ICategorysRepository>('CategoryRepository', CategoryRepository);
