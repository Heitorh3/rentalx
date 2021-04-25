import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import uploadConfig from '@config/upload';

import UserToken from './UserToken';

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

  @OneToMany(() => UserToken, userToken => userToken.user)
  userToken: UserToken;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(
    props: Exclude<User, 'id' | 'avatar' | 'created_at' | 'updated_at'>,
    id?: string,
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidV4();
    }
  }

  @Expose({ name: 'avatar_url' })
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

export default User;
