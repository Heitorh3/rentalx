
import { PostgresCategoryRepository } from '../../repositories/implementations/PostgresCategoryRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let fakePostgresCategoryRepository: PostgresCategoryRepository;
let createCategorieUseCase: CreateCategoryUseCase;

describe('Create category', () => {
  beforeEach(() => {
    fakePostgresCategoryRepository = new PostgresCategoryRepository();

    createCategorieUseCase = new CreateCategoryUseCase(
      fakePostgresCategoryRepository,
    );
  });

  it('should be able to create a new category', async () => {
    const category = await createCategorieUseCase.execute({
      name: 'SUV',
      description: 'Carros com um apelo mais off-road',
    });

    expect(category).toHaveProperty('id');
  });
});
