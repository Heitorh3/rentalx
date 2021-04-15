import { ICreateCategoryUseCase } from './ICreateCategoryUseCase';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

import { container } from 'tsyringe';

// container.registerSingleton<ICategorysRepository>('CategoryRepository', PostgresCategoryRepository);
container.registerSingleton<ICreateCategoryUseCase>('CreateCategoryUseCase', CreateCategoryUseCase);

// @inject('CreateCategoryUseCase')
// const createCategoryUseCase;

// const createCategorieController = new CreateCategoryController(
//   createCategorieUseCase,
// );

// export { createCategorieController };
