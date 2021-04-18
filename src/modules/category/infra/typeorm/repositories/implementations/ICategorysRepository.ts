import { Category } from '@modules/category/infra/typeorm/entities/Category';
export interface ICategorysRepository {
  findByName(name: string): Promise<Category | undefined>;
  save(category: Category): Promise<void>;
}
