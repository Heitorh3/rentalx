
import { container } from 'tsyringe';

import './providers';

import { CategoryRepository } from '@repositories/implementations/categories/CategoryRepository';
import { ICategorysRepository } from '@repositories/implementations/categories/ICategorysRepository';

container.registerSingleton<ICategorysRepository>('CategoryRepository', CategoryRepository);
