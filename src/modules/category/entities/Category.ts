import { v4 as uuidV4 } from 'uuid';

import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
class Category {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(props: Exclude<Category, 'id' | "created_at" | "updated_at">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidV4();
    }
  }
}

export { Category };