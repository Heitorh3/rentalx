import { v4 as uuidV4 } from 'uuid';

import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';

@Entity('users')
class User {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  avatar?: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(props: Exclude<User, 'id' | "avatar" | "created_at" | "updated_at">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidV4();
    }
  }

  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_S3_URL}/${this.avatar}`;
      default:
        return null;
    }
  }
}

export { User };
