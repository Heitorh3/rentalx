
import { container } from 'tsyringe';

import './providers';

import { CategoryRepository } from '@modules/category/infra/typeorm/repositories/implementations/categories/CategoryRepository';
import { ICategorysRepository } from '@modules/category/infra/typeorm/repositories/implementations/categories/ICategorysRepository';

import { ICreateCategoryUseCase } from '@modules/category/services/createCategories/ICreateCategoryUseCase'
import { CreateCategoryUseCase } from '@modules/category/services/createCategories/CreateCategoryUseCase'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/implementations/users/UserRepository';
import { IUserRepository } from '@modules/users/infra/typeorm/repositories/implementations/users/IUserRepository';

container.registerSingleton<ICreateCategoryUseCase>('CreateCategoryUseCase', CreateCategoryUseCase);

container.registerSingleton<ICategorysRepository>('CategoryRepository', CategoryRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
