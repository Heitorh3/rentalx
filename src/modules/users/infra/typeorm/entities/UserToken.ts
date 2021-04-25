import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import User from './User';

@Entity('user_tokens')
class UserToken {
  @PrimaryColumn()
  id?: string;

  @Column()
  refresh_token?: string;

  @Column()
  token?: string;

  @Column()
  user_id?: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  expires_date?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(
    props: Exclude<UserToken, 'id' | 'token' | 'created_at' | 'updated_at'>,
    id?: string,
    token?: string,
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidV4();
    }
    if (!token) {
      this.token = uuidV4();
    }
  }
}

export default UserToken;
