import { v4 as uuidV4 } from 'uuid';

import { IUserTokenRepository } from '../IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUsersTokensRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = Object(null);

    Object.assign(userToken, {
      id: uuidV4(),
      token: uuidV4(),
      user_id,
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
}

export default FakeUsersTokensRepository;
