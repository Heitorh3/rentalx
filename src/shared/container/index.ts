
import { container } from 'tsyringe';

import './providers';

import { CategoryRepository } from '@repositories/implementations/categories/CategoryRepository';
import { ICategorysRepository } from '@repositories/implementations/categories/ICategorysRepository';

import { ICreateCategoryUseCase } from '@useCases/createCategories/ICreateCategoryUseCase'
import { CreateCategoryUseCase } from '@useCases/createCategories/CreateCategoryUseCase'

import { UserRepository } from '@repositories/implementations/users/UserRepository';
import { IUserRepository } from '@repositories/implementations/users/IUserRepository';

container.registerSingleton<ICreateCategoryUseCase>('CreateCategoryUseCase', CreateCategoryUseCase);

container.registerSingleton<ICategorysRepository>('CategoryRepository', CategoryRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
