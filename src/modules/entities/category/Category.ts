import { v4 as uuid } from 'uuid';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('categories')
class Category {

  @Column
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  constructor(props: Omit<Category, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export { Category };
