import { v4 as uuidV4 } from 'uuid';

import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { IUserTokenRepository } from '../IUserTokenRepository';

class FakeUsersTokensRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = Object(null);

    Object.assign(userToken, {
      id: uuidV4(),
      token: uuidV4(),
      user_id,
      refresh_token,
      expires_date,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }

  public async findByUser(user: User): Promise<UserToken> {
    const userToken = this.userTokens.find(
      findUser => findUser.user_id === user.id,
    );
    return userToken;
  }

  public async delete(token: string): Promise<void> {
    const tokenIndex = this.userTokens.findIndex(
      findToken => findToken.token === token,
    );

    this.userTokens.splice(tokenIndex, 1);
  }
}

export default FakeUsersTokensRepository;
