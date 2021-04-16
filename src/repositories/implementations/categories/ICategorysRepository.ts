import { Category } from 'modules/entities/category/Category';
export interface ICategorysRepository {
  findByName(name: string): Promise<Category | undefined>;
  save(category: Category): Promise<void>;
}
