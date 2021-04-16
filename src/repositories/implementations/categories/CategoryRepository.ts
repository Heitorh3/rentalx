import { getRepository, Repository } from 'typeorm';

import { Category } from 'modules/entities/category/Category';
import { ICategorysRepository } from './ICategorysRepository';

class CategoryRepository implements ICategorysRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name },
    });

    return category;
  }
  public async save(category: Category): Promise<void> {
    await this.ormRepository.save(category);
  }
}

export { CategoryRepository };
