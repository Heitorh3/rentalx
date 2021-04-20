
import { container } from 'tsyringe';

import './providers';

import { ICreateCategoryUseCase } from '@modules/category/services/createCategories/ICreateCategoryUseCase'
import { CreateCategoryUseCase } from '@modules/category/services/createCategories/CreateCategoryUseCase'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/users/infra/typeorm/repositories/implementations/IUserRepository';

import { IUpdateProfileUseCase } from '@modules/users/services/updateProfile/IUpdateProfileUseCase';
import { UpdateProfileUseCase } from '@modules/users/services/updateProfile/UpdateProfileUseCase'

container.registerSingleton<ICreateCategoryUseCase>('CreateCategoryUseCase', CreateCategoryUseCase);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUpdateProfileUseCase>('UpdateProfileUseCase', UpdateProfileUseCase);
