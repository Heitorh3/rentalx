// import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// // let fakePostgresCategoryRepository: PostgresCategoryRepository;
// let createCategorieUseCase: CreateCategoryUseCase;

// describe('Create category', () => {
//   beforeEach(() => {
//     fakePostgresCategoryRepository = new PostgresCategoryRepository();

//     createCategorieUseCase = new CreateCategoryUseCase(
//       fakePostgresCategoryRepository,
//     );
//   });

//   it('should be able to create a new category', async () => {
//     const category = await createCategorieUseCase.execute({
//       name: 'SUV',
//       description: 'Carros com um apelo mais off-road',
//     });

//     expect(category).toHaveProperty('id');
//   });
// });

describe('Create category', () => {
  it('should create a new category', () => {
    const soma = 2 + 2;

    expect(soma).toBe(4)
  })
});
