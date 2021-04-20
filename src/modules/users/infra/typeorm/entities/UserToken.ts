import { v4 as uuidV4 } from 'uuid';

import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users_tokens')
class UserToken {

  @PrimaryColumn()
  id?: string;

  @Column()
  token?: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(props: Exclude<UserToken, 'id' | "token" | "created_at" | "updated_at">, id?, token?: string) {
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
