import { Category } from '@modules/category/entities/Category';
export interface ICategorysRepository {
  findByName(name: string): Promise<Category | undefined>;
  save(category: Category): Promise<void>;
}
