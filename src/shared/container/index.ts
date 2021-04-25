import { container } from 'tsyringe';

import './providers';

import { CreateCategoryUseCase } from '@modules/category/services/createCategories/CreateCategoryUseCase';
import { ICreateCategoryUseCase } from '@modules/category/services/createCategories/ICreateCategoryUseCase';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/implementations/UserRepository';
import { UserTokenRepository } from '@modules/users/infra/typeorm/repositories/implementations/UserTokenRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
import { IUpdateProfileUseCase } from '@modules/users/services/updateProfile/IUpdateProfileUseCase';
import { UpdateProfileUseCase } from '@modules/users/services/updateProfile/UpdateProfileUseCase';

container.registerSingleton<ICreateCategoryUseCase>(
  'CreateCategoryUseCase',
  CreateCategoryUseCase,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUpdateProfileUseCase>(
  'UpdateProfileUseCase',
  UpdateProfileUseCase,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
